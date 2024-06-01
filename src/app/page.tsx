import { SearchInput } from '@/components/map-control/search-input'
import { ZoomControl } from '@/components/map-control/zoom'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('../components/map-container'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="h-full w-full relative">
      <MapComponent />
      <ZoomControl />
      <SearchInput />
    </main>
  )
}
