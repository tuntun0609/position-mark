'use client'

import { useClickAway } from 'react-use'
import { useEffect, useRef, useState } from 'react'
import { useMap } from '../map-context'
import { Button } from '../ui/button'
import { Loader, Search } from 'lucide-react'
import { addMarker } from '@/lib/map-utils'
import { useSelectedLayerStore } from '@/stores/select-layer-store-provider'

const SearchInput = () => {
  const [query, setQuery] = useState('')
  const [siteList, setSiteList] = useState<any[]>([])
  const { map, hwService } = useMap()
  const [searchResultOpen, setSearchResultOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setSelectedLayer } = useSelectedLayerStore((state) => state)
  const ref = useRef(null)
  useClickAway(ref, () => {
    setSearchResultOpen(false)
  })

  const onSearch = async () => {
    try {
      setLoading(true)
      const centerLatLng = map?.getCenter()
      console.log(centerLatLng)
      const result: any = await new Promise((resolve, reject) => {
        hwService.searchByText(
          {
            query,
            location: centerLatLng,
          },
          (result: any, status: number) => {
            if (status !== 0) {
              resolve(result)
            } else {
              reject(result)
            }
          }
        )
      })
      setSiteList(result.sites)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const onClickSite = (site: any) => {
    if (!map) {
      return
    }
    map.setView([site.location.lat, site.location.lng], 16)
    const marker = addMarker(map, [site.location.lat, site.location.lng])
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
          <Button variant="ghost" className="p-0 w-8 h-8" onClick={onSearch}>
            <span className="sr-only">Search</span>
            {loading ? (
              <Loader className="animate-spin w-4 h-4" />
            ) : (
              <Search className="w-4 h-4" />
            )}
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
    </div>
  )
}

export default SearchInput
