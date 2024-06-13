'use client'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Hand } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useMap } from '../map-context'

export const Toolbar = () => {
  const [selectedTool, setSelectedTool] = useState('hand')
  const { map } = useMap()

  const onPmCreate = useCallback(() => {
    setSelectedTool('hand')
  }, [])

  const onSelectTool = (value: string) => {
    if (value) {
      setSelectedTool(value)

      if (value === 'polyline') {
        map?.pm.enableDraw('Line', {
          snappable: true,
          snapDistance: 20,
        })
      }
      if (value === 'hand') {
        map?.pm.disableDraw()
      }
      if (value === 'rectangle') {
        map?.pm.enableDraw('Rectangle', {
          snappable: true,
          snapDistance: 20,
        })
      }
      if (value === 'polygon') {
        map?.pm.enableDraw('Polygon', {
          snappable: true,
          snapDistance: 20,
        })
      }
    }
  }

  useEffect(() => {
    map?.on('pm:create', onPmCreate)

    return () => {
      map?.off('pm:create', onPmCreate)
    }
  }, [map])

  return (
    <div className="h-10 absolute top-2 z-[9999] left-[416px] p-1 bg-white rounded-sm border flex items-center">
      <ToggleGroup
        type="single"
        value={selectedTool}
        onValueChange={onSelectTool}>
        <ToggleGroupItem className="h-8 px-2" value="hand">
          <Hand className="w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem className="h-8 px-2" value="polyline">
          <Image
            src="/icons/polyline.svg"
            alt="polyline"
            width={16}
            height={20}
          />
        </ToggleGroupItem>
        <ToggleGroupItem className="h-8 px-2" value="rectangle">
          <Image
            src="/icons/rectangle.svg"
            alt="rectangle"
            width={16}
            height={20}
          />
        </ToggleGroupItem>
        <ToggleGroupItem className="h-8 px-2" value="polygon">
          <Image
            src="/icons/polygon.svg"
            alt="polygon"
            width={24}
            height={24}
          />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
