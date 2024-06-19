import type { Metadata } from 'next'
import { MapProvider } from '@/components/map-provider'
import { RoutePathProvider } from '@/components/route-path-provider'

export const metadata: Metadata = {
  title: 'Position Marker | Map Edit',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <MapProvider>
      <RoutePathProvider>{children}</RoutePathProvider>
    </MapProvider>
  )
}
