'use client'

import { ZoomIn, ZoomOut } from 'lucide-react'
import { useMap } from '../map-context'

export const ZoomControl = () => {
  const { map } = useMap()
  return (
    <span className="absolute right-2 bottom-2 z-[9999] flex flex-col overflow-hidden rounded-md border bg-white shadow-sm">
      <button
        onClick={() => map?.zoomIn()}
        className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
        title="Edit Product">
        <ZoomIn />
      </button>

      <button
        onClick={() => map?.zoomOut()}
        className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
        title="Delete Product">
        <ZoomOut />
      </button>
    </span>
  )
}
