import type { Metadata } from 'next'
import { Sidebar } from '@/components/sidebar'
import { UserProvider } from '@/components/user-provider'
import { getUser } from '@/lib/user'
import { isNil } from 'lodash-es'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Position Marker | Map',
  description: 'Generated by create next app',
}

export default async function MapLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUser()

  return (
    <UserProvider user={user}>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </UserProvider>
  )
}
