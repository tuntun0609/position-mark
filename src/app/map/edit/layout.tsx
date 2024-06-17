import type { Metadata } from 'next'
import { MapProvider } from '@/components/map-context'

export const metadata: Metadata = {
  title: 'Position Marker | Map Edit',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <MapProvider>{children}</MapProvider>
}
