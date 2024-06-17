import React from 'react'

import Image from 'next/image'
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const Sidebar = () => {
  return (
    <aside className="w-20 h-full border-r flex flex-col justify-start items-center">
      <Image
        src="/icons/map-marker.svg"
        alt="logo"
        width={40}
        height={40}
        className="my-8"
      />
      <nav className="flex-1 flex flex-col justify-between mb-8">
        <div className="flex flex-col item-center gap-2">
          <Button variant="ghost" className="flex flex-col w-full h-14">
            <Image src="/icons/menu.svg" alt="menu" width={24} height={24} />
            <span className="text-blue-500 text-xs">菜单</span>
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <ClerkLoading>
            <Loader className="animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button className="w-full px-2" variant="outline">
                  登录
                </Button>
              </Link>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </nav>
    </aside>
  )
}
