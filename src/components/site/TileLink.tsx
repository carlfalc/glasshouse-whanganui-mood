import type { MouseEvent } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  image: string;
  label: string;
  className?: string;
  cornerText?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const TileLink = ({ to, image, label, className = "", cornerText, onClick }: Props) => (
  <Link
    to={to}
    onClick={onClick}
    className={`group relative block overflow-hidden aspect-[4/5] ${className}`}
  >
    <img
      src={image}
      alt={label}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
    {cornerText && (
      <span className="absolute top-4 right-4 text-[11px] uppercase tracked text-cream/90">
        {cornerText}
      </span>
    )}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
      <h3 className="font-serif text-4xl md:text-5xl text-cream whitespace-pre-line">{label}</h3>
      <span className="mt-4 text-[11px] uppercase tracked text-cream/90 border-b border-transparent group-hover:border-brass pb-1 transition-colors">
        Explore
      </span>
    </div>
  </Link>
);

export default TileLink;
