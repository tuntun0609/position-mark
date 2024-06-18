'use client'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Hand } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useMap } from '../map-provider'
import { useSelectedLayerStore } from '@/stores/select-layer-store-provider'

export const Toolbar = () => {
  const [selectedTool, setSelectedTool] = useState('hand')
  const { map } = useMap()
  const { setSelectedLayer } = useSelectedLayerStore((state) => state)
  const [isSelectRoutePoint, setIsSelectRoutePoint] = useState(false)

  const onPmCreate = useCallback(() => {
    setSelectedTool('hand')
  }, [])

  const onSelectTool = (value: string) => {
    if (value) {
      setSelectedTool(value)
      setSelectedLayer(null)

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
      if (value === 'routePath') {
        map?.pm.disableDraw()
        setIsSelectRoutePoint(true)
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
      <TooltipProvider>
        <ToggleGroup
          type="single"
          value={selectedTool}
          onValueChange={onSelectTool}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem className="h-8 px-2" value="hand">
                <Hand className="w-4" />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>地图拖动工具</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem className="h-8 px-2" value="polyline">
                <Image
                  src="/icons/polyline.svg"
                  alt="polyline"
                  width={16}
                  height={20}
                />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>添加直线/折线</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem className="h-8 px-2" value="rectangle">
                <Image
                  src="/icons/rectangle.svg"
                  alt="rectangle"
                  width={16}
                  height={20}
                />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>添加矩形</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem className="h-8 px-2" value="polygon">
                <Image
                  src="/icons/polygon.svg"
                  alt="polygon"
                  width={24}
                  height={24}
                />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>添加多边形</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem className="h-8 px-2" value="routePath">
                <Image
                  src="/icons/path-location.svg"
                  alt="polygon"
                  width={20}
                  height={20}
                />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>路径规划</p>
            </TooltipContent>
          </Tooltip>
        </ToggleGroup>
      </TooltipProvider>
    </div>
  )
}
