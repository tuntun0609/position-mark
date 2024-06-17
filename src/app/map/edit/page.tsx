import LayerEditor from '@/components/map-control/layer-editor'
import { Toolbar } from '@/components/map-control/tool-bar'
import { ZoomControl } from '@/components/map-control/zoom'
import { SelectedLayerProvider } from '@/stores/select-layer-store-provider'
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
        {
          <>
            <MapComponent />
            <ZoomControl />
            <SearchInput />
            <Toolbar />
            <LayerEditor />
          </>
        }
      </main>
    </SelectedLayerProvider>
  )
}
