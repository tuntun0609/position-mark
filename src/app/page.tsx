import { Toolbar } from '@/components/map-control/tool-bar'
import { ZoomControl } from '@/components/map-control/zoom'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('../components/map-container'), {
  ssr: false,
})
const SearchInput = dynamic(
  () => import('../components/map-control/search-input'),
  {
    ssr: false,
  }
)

export default function Home() {
  return (
    <main className="h-full w-full relative">
      <MapComponent />
      <ZoomControl />
      <SearchInput />
      <Toolbar />
    </main>
  )
}
