'use client'

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { useState } from 'react'
import { useMap } from '../map-context'

export const SearchInput = () => {
  const [query, setQuery] = useState('')
  const [siteList, setSiteList] = useState<any[]>([])
  const { hwService } = useMap()

  const onSearch = async () => {
    try {
      hwService.searchByText(
        {
          query,
        },
        (result: any, status: number) => {
          if (status !== 0) {
            setSiteList(result.sites)
          }
        }
      )
    } catch (error) {}
  }

  return (
    <div className="absolute top-2 left-2 z-[9999]">
      <Command className="w-96">
        <CommandInput
          value={query}
          onValueChange={(search) => {
            setQuery(search)
          }}
          onSearch={onSearch}
          placeholder="请输入想要查询的地址"
        />
        <CommandList>
          {/* <CommandEmpty>没有这个地址哦</CommandEmpty> */}
          {siteList.map((site) => (
            <CommandItem key={site.siteId}>{site.formatAddress}</CommandItem>
          ))}
        </CommandList>
      </Command>
    </div>
  )
}
