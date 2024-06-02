'use client'

import { useClickAway } from 'react-use'
import { useRef, useState } from 'react'
import { useMap } from '../map-context'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'

export const SearchInput = () => {
  const [query, setQuery] = useState('')
  const [siteList, setSiteList] = useState<any[]>([])
  const { map, hwService } = useMap()
  const [searchResultOpen, setSearchResultOpen] = useState(false)
  const ref = useRef(null)
  useClickAway(ref, () => {
    setSearchResultOpen(false)
  })

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

  const onClickSite = (site: any) => {
    map?.setView([site.location.lat, site.location.lng], 23)
  }

  return (
    <div ref={ref} className="absolute top-2 left-2 z-[9999] w-[400px]">
      <div className="relative">
        <label htmlFor="Search" className="sr-only">
          {' '}
          Search{' '}
        </label>

        <input
          value={query}
          onChange={(e) => {
            if (siteList.length) {
              setSiteList([])
            }
            setQuery(e.target.value)
          }}
          onFocus={() => {
            setSearchResultOpen(true)
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              onSearch()
            }
          }}
          type="text"
          id="Search"
          placeholder="在这里搜索地址哦"
          className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm focus:ring-primary"
        />

        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <Button variant="outline" className="p-0 w-8 h-8" onClick={onSearch}>
            <span className="sr-only">Search</span>
            <Search className="w-4 h-4" />
          </Button>
        </span>
      </div>
      {searchResultOpen && siteList.length > 0 && (
        <div className="mt-2 max-h-96 z-[9999] bg-white rounded-xl p-2">
          <div className=" max-h-80 overflow-y-auto">
            {siteList.map((site) => (
              <div
                className="rounded-xl h-10 overflow-hidden whitespace-nowrap text-sm flex items-center px-4 cursor-pointer hover:bg-gray-100"
                key={site.siteId}
                onClick={() => onClickSite(site)}>
                {site.name}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* <Command className="w-96" shouldFilter={false}>
        <CommandInput
          value={query}
          onValueChange={(search) => {
            setQuery(search)
          }}
          onSearch={onSearch}
          placeholder="请输入想要查询的地址"
        />
        <CommandList>
          {siteList.map((site) => (
            <CommandItem
              className="h-10 overflow-hidden whitespace-nowrap text-sm"
              key={site.siteId}
              value={site.siteId}
              onSelect={() => {
                map?.setView(
                  [site.viewport.northeast.lat, site.viewport.northeast.lng],
                  16
                )
              }}>
              {site.formatAddress}
              <FontAwesomeIcon icon={faLocationDot} />
            </CommandItem>
          ))}
        </CommandList>
      </Command> */}
    </div>
  )
}
