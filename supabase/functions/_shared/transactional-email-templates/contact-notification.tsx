/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  phone?: string
  message?: string
}

const Email = ({ name, email, phone, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New enquiry from {name || 'a website visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>GLASS HOUSE · WHANGANUI</Text>
        <Heading style={h1}>New website enquiry</Heading>
        <Hr style={hr} />
        <Section style={section}>
          <Text style={label}>Name</Text>
          <Text style={value}>{name || '—'}</Text>
          <Text style={label}>Email</Text>
          <Text style={value}>{email || '—'}</Text>
          <Text style={label}>Phone</Text>
          <Text style={value}>{phone || '—'}</Text>
          <Text style={label}>Message</Text>
          <Text style={value}>{message || '—'}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          Sent from the Glass House website contact form.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Props) => `New enquiry from ${data?.name || 'website visitor'}`,
  displayName: 'Contact form notification',
  to: 'Info@glass-house.co.nz',
  previewData: {
    name: 'Jane Traveller',
    email: 'jane@example.com',
    phone: '021 555 1234',
    message: 'Do you have a table for four this Saturday evening?',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const eyebrow = { fontSize: '11px', letterSpacing: '3px', color: '#B89968', margin: '0 0 8px' }
const h1 = { fontSize: '24px', color: '#1A1A1A', fontWeight: 400 as const, margin: '0' }
const hr = { borderColor: '#e6e1d8', margin: '20px 0' }
const section = { margin: '0' }
const label = { fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#B89968', margin: '14px 0 2px' }
const value = { fontSize: '15px', color: '#1A1A1A', margin: '0', whiteSpace: 'pre-wrap' as const }
const footer = { fontSize: '12px', color: '#8a8madd'.slice(0, 7) || '#8a8a8a', margin: '0' }
