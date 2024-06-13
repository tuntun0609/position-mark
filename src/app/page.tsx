import LayerEditor from '@/components/map-control/layer-editor'
import { Toolbar } from '@/components/map-control/tool-bar'
import { ZoomControl } from '@/components/map-control/zoom'
import { SelectedLayerProvider } from '@/stores/select-layer-store-provider'
import { currentUser } from '@clerk/nextjs/server'
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

export default async function Home() {
  const user = await currentUser()
  console.log(user)
  return (
    <SelectedLayerProvider>
      <main className="h-full w-full relative">
        {/* 未登录不允许使用 */}
        {user ? (
          <>
            <MapComponent />
            <ZoomControl />
            <SearchInput />
            <Toolbar />
            <LayerEditor />
          </>
        ) : null}
      </main>
    </SelectedLayerProvider>
  )
}
