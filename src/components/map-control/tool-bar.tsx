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
import { useRoutePath } from '../route-path-provider'

export const Toolbar = () => {
  const [selectedTool, setSelectedTool] = useState('hand')
  const { map } = useMap()
  const { setSelectedLayer } = useSelectedLayerStore((state) => state)
  const { setIsSelectRoutePoint, isSelectRoutePoint } = useRoutePath()

  const onPmCreate = useCallback(() => {
    setSelectedTool('hand')
  }, [])

  const onSelectTool = (value: string) => {
    if (value) {
      const allLayers = map?.pm.getGeomanLayers()
      allLayers?.forEach((layer: any) => {
        layer.pm.disable()
        layer.pm.disableLayerDrag()
      })
      setSelectedTool(value)
      setSelectedLayer(null)
      if (value !== 'routePath' && isSelectRoutePoint) {
        setIsSelectRoutePoint(false)
      }

      if (value === 'polyline') {
        map?.pm.enableDraw('Line', {
          snappable: true,
          snapDistance: 20,
        })
      } else if (value === 'hand') {
        map?.pm.disableDraw()
      } else if (value === 'rectangle') {
        map?.pm.enableDraw('Rectangle', {
          snappable: true,
          snapDistance: 20,
        })
      } else if (value === 'polygon') {
        map?.pm.enableDraw('Polygon', {
          snappable: true,
          snapDistance: 20,
        })
      } else if (value === 'routePath') {
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

  useEffect(() => {
    if (!isSelectRoutePoint) {
      setSelectedTool('hand')
    }
  }, [isSelectRoutePoint])

  return (
    <div className="h-10 absolute top-2 z-[9999] left-[416px] p-1 bg-white rounded-sm border flex items-center">
      <TooltipProvider delayDuration={300}>
        <ToggleGroup
          value={selectedTool}
          type="single"
          onValueChange={onSelectTool}>
          <ToggleGroupItem className="h-8 px-2" value="hand">
            <Tooltip>
              <TooltipTrigger asChild>
                <Hand className="w-4 h-8" />
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>
                <p>地图拖动工具</p>
              </TooltipContent>
            </Tooltip>
          </ToggleGroupItem>
          <ToggleGroupItem className="h-8 px-2" value="polyline">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-8 flex items-center">
                  <Image
                    src="/icons/polyline.svg"
                    alt="polyline"
                    width={16}
                    height={32}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>
                <p>添加直线/折线</p>
              </TooltipContent>
            </Tooltip>
          </ToggleGroupItem>
          <ToggleGroupItem className="h-8 px-2" value="rectangle">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-8 flex items-center">
                  <Image
                    src="/icons/rectangle.svg"
                    alt="rectangle"
                    width={16}
                    height={20}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>
                <p>添加矩形</p>
              </TooltipContent>
            </Tooltip>
          </ToggleGroupItem>
          <ToggleGroupItem className="h-8 px-2" value="polygon">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-8 flex items-center">
                  <Image
                    src="/icons/polygon.svg"
                    alt="polygon"
                    width={24}
                    height={24}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>
                <p>添加多边形</p>
              </TooltipContent>
            </Tooltip>
          </ToggleGroupItem>
          <ToggleGroupItem className="h-8 px-2" value="routePath">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-8 flex items-center">
                  <Image
                    src="/icons/path-location.svg"
                    alt="polygon"
                    width={20}
                    height={20}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>
                <p>路径规划</p>
              </TooltipContent>
            </Tooltip>
          </ToggleGroupItem>
        </ToggleGroup>
      </TooltipProvider>
    </div>
  )
}
