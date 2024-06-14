import type { Metadata } from 'next'
import { Sidebar } from '@/components/sidebar'
import { MapProvider } from '@/components/map-context'

export const metadata: Metadata = {
  title: 'Position Marker | Map',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <MapProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </MapProvider>
  )
}