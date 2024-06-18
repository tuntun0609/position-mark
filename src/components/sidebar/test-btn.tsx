'use client'

import { useMap } from '@/components/map-provider'
import { Button } from '../ui/button'
import Image from 'next/image'

export const TestBtn = () => {
  const { map } = useMap()
  const test = () => {}
  return (
    <Button
      onClick={test}
      variant="ghost"
      className="flex flex-col w-full h-14">
      <Image src="/icons/menu.svg" alt="menu" width={24} height={24} />
      <span className="text-blue-500 text-xs">菜单</span>
    </Button>
  )
}
