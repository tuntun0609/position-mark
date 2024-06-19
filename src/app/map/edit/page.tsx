import LayerEditor from '@/components/map-control/layer-editor'
import { Toolbar } from '@/components/map-control/tool-bar'
import { ZoomControl } from '@/components/map-control/zoom'
import RoutePathSelectingTip from '@/components/route-path-selecting-tip'
import { SelectedLayerProvider } from '@/stores/select-layer-store-provider'
import { SignedIn } from '@clerk/nextjs'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('@/components/map-container'), {
  ssr: false,
})
const SearchInput = dynamic(
  () => import('@/components/map-control/search-input'),
  {
    ssr: false,
  }
)

export default async function Home() {
  return (
    <SelectedLayerProvider>
      <main className="h-full w-full relative">
        {/* 未登录不允许使用 */}
        <SignedIn>
          <MapComponent />
          <ZoomControl />
          <SearchInput />
          <Toolbar />
          <LayerEditor />
          <RoutePathSelectingTip />
        </SignedIn>
      </main>
    </SelectedLayerProvider>
  )
}
