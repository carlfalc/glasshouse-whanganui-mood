import { useEffect, useState, useCallback, useRef } from "react";
import Layout from "@/components/site/Layout";
import portrait from "@/assets/about-hero.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { toast } from "@/hooks/use-toast";
import { GripVertical } from "lucide-react";

type Member = {
  id: string;
  name: string;
  role: string;
  tier: string;
  bio: string;
  sort_order: number;
};

const tierOrder: Record<string, number> = { executive: 0, sous: 1, breakfast: 2 };

const Card = ({
  m,
  draggable,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
}: {
  m: Member;
  draggable: boolean;
  onDragStart?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: () => void;
  isDragging?: boolean;
}) => (
  <article
    className={`text-center relative transition-opacity ${isDragging ? "opacity-40" : ""} ${draggable ? "cursor-grab active:cursor-grabbing" : ""}`}
    draggable={draggable}
    onDragStart={onDragStart}
    onDragOver={onDragOver}
    onDrop={onDrop}
  >
    {draggable && (
      <span className="absolute top-2 right-2 z-10 rounded bg-background/70 p-1 text-brass" aria-hidden>
        <GripVertical className="h-5 w-5" />
      </span>
    )}
    <div className="aspect-[4/5] overflow-hidden mb-6 bg-muted">
      <img src={portrait} alt={`${m.name} — ${m.role}`} loading="lazy" className="w-full h-full object-cover grayscale opacity-90 pointer-events-none" />
    </div>
    <h3 className="font-serif text-2xl text-cream">{m.name}</h3>
    <p className="text-[11px] uppercase tracked text-brass mt-2">{m.role}</p>
    <p className="text-sm text-cream/65 mt-4 leading-relaxed">{m.bio || "[Short 1–2 line bio — to add.]"}</p>
  </article>
);

const OurPeople = () => {
  const { isAuthorized } = useAdminAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const dragId = useRef<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await (supabase as any)
      .from("team_members")
      .select("id,name,role,tier,bio,sort_order");
    if (!error && data) {
      const sorted = (data as Member[]).sort(
        (a, b) =>
          (tierOrder[a.tier] ?? 99) - (tierOrder[b.tier] ?? 99) ||
          a.sort_order - b.sort_order
      );
      setMembers(sorted);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const executive = members.filter((m) => m.tier === "executive");
  const sous = members.filter((m) => m.tier === "sous");
  const breakfast = members.filter((m) => m.tier === "breakfast");

  const handleDrop = async (targetId: string) => {
    const sourceId = dragId.current;
    dragId.current = null;
    setDraggingId(null);
    if (!sourceId || sourceId === targetId) return;

    const source = members.find((m) => m.id === sourceId);
    const target = members.find((m) => m.id === targetId);
    if (!source || !target || source.tier !== target.tier) return;

    const group = members.filter((m) => m.tier === source.tier);
    const others = members.filter((m) => m.tier !== source.tier);
    const fromIdx = group.findIndex((m) => m.id === sourceId);
    const toIdx = group.findIndex((m) => m.id === targetId);
    const reordered = [...group];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);

    const withOrder = reordered.map((m, i) => ({ ...m, sort_order: i }));
    setMembers([...others, ...withOrder].sort(
      (a, b) =>
        (tierOrder[a.tier] ?? 99) - (tierOrder[b.tier] ?? 99) ||
        a.sort_order - b.sort_order
    ));

    const updates = await Promise.all(
      withOrder.map((m) =>
        (supabase as any).from("team_members").update({ sort_order: m.sort_order }).eq("id", m.id)
      )
    );
    if (updates.some((u: any) => u.error)) {
      toast({ title: "Couldn't save order", description: "Please try again.", variant: "destructive" });
      load();
    } else {
      toast({ title: "Order saved" });
    }
  };

  const dragProps = (m: Member) =>
    isAuthorized
      ? {
          draggable: true,
          isDragging: draggingId === m.id,
          onDragStart: () => {
            dragId.current = m.id;
            setDraggingId(m.id);
          },
          onDragOver: (e: React.DragEvent) => e.preventDefault(),
          onDrop: () => handleDrop(m.id),
        }
      : { draggable: false };

  return (
    <Layout title="Our People — Glass House Whanganui" description="Meet the chefs and team behind Glass House in Whanganui, New Zealand.">
      <section className="pt-40 pb-12 text-center container-narrow">
        <p className="text-[11px] uppercase tracked text-brass mb-6">​</p>
        <h1 className="font-serif text-5xl md:text-6xl text-cream">Our People</h1>
        <div className="w-12 h-px bg-brass mx-auto mt-8" />
        {isAuthorized && !loading && (
          <p className="text-xs text-cream/50 mt-6">Admin mode — drag tiles within a group to reorder.</p>
        )}
      </section>

      <section className="container-narrow pb-32 max-w-5xl mx-auto space-y-14 md:space-y-20">
        {/* Executive Chef — top, centered alone */}
        {executive.length > 0 && (
          <div className="flex justify-center">
            <div className="w-full max-w-xs">
              <Card m={executive[0]} {...dragProps(executive[0])} />
            </div>
          </div>
        )}

        {/* Sous Chefs — 3 per row */}
        {sous.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
            {sous.map((m) => (
              <Card key={m.id} m={m} {...dragProps(m)} />
            ))}
          </div>
        )}

        {/* Breakfast Chef — last, centered alone */}
        {breakfast.length > 0 && (
          <div className="flex justify-center">
            <div className="w-full max-w-xs">
              <Card m={breakfast[0]} {...dragProps(breakfast[0])} />
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default OurPeople;
