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
        <ul className="text-sm flex flex-col items-center gap-1">
          <li className="flex flex-col items-center gap-1 cursor-pointer">
            <Image src="/icons/menu.svg" alt="menu" width={28} height={28} />
            <span className="text-blue-500">菜单</span>
          </li>
        </ul>
        <div>
          <ClerkLoading>
            <Loader className="animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button className="w-full px-2" variant="outline">
                  登录
                </Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </nav>
    </aside>
  )
}
