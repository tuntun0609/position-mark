'use client'

import { useSelectedLayerStore } from '@/stores/select-layer-store-provider'

const LayerEditor = () => {
  const { selectedLayer } = useSelectedLayerStore((state) => state)
  return (
    <div className="fixed top-4 right-4 z-[99999]">
      {selectedLayer ? 'has' : 'no'}
    </div>
  )
}

export default LayerEditor
