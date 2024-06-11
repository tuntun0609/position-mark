'use client'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Hand } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useMap } from '../map-context'

export const Toolbar = () => {
  const [selectedTool, setSelectedTool] = useState('hand')
  const { map } = useMap()
  return (
    <div className="h-10 absolute top-2 z-[9999] left-[416px] p-1 bg-white rounded-sm border flex items-center">
      <ToggleGroup
        type="single"
        value={selectedTool}
        onValueChange={(value) => {
          if (value) {
            setSelectedTool(value)
            console.log(value)

            if (value === 'polyline') {
              map?.pm.enableDraw('Line', {
                snappable: true,
                snapDistance: 20,
              })
            }
            if (value === 'hand') {
              map?.pm.disableDraw()
            }
            if (value === 'b') {
              // 输出line
              map?.eachLayer((layer) => {
                if (layer instanceof L.Polyline) {
                  console.log(layer.toGeoJSON())
                }
              })
            }
          }
        }}>
        <ToggleGroupItem className="h-8 px-2" value="hand">
          <Hand className="w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem className="h-8 px-2" value="polyline">
          <Image src="/icons/polyline.svg" alt="menu" width={16} height={20} />
        </ToggleGroupItem>
        <ToggleGroupItem className="h-8" value="b">
          B
        </ToggleGroupItem>
        <ToggleGroupItem className="h-8" value="c">
          C
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
