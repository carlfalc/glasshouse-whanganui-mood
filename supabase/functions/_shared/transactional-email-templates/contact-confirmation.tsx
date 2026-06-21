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
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
}

const Email = ({ name }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Thanks for thinking of us — Glass House Whanganui</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>GLASS HOUSE · WHANGANUI</Text>
        <Heading style={h1}>Thanks for thinking of us</Heading>
        <Hr style={hr} />
        <Text style={text}>{name ? `Kia ora ${name},` : 'Kia ora,'}</Text>
        <Text style={text}>
          We've received your message and will be in contact as soon as possible.
        </Text>
        <Text style={text}>
          If your enquiry is time-sensitive, please call us on{' '}
          <span style={{ color: '#B89968' }}>06 242 4177</span>.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Glass House · 379 Victoria Avenue, The Avenue Hotel, Whanganui
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Thanks for thinking of us — Glass House',
  displayName: 'Contact form confirmation',
  previewData: { name: 'Jane' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const eyebrow = { fontSize: '11px', letterSpacing: '3px', color: '#B89968', margin: '0 0 8px' }
const h1 = { fontSize: '26px', color: '#1A1A1A', fontWeight: 400 as const, margin: '0' }
const hr = { borderColor: '#e6e1d8', margin: '20px 0' }
const text = { fontSize: '15px', color: '#1A1A1A', lineHeight: '1.6', margin: '0 0 14px' }
const footer = { fontSize: '12px', color: '#8a8a8a', margin: '0' }
