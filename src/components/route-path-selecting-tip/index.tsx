'use client'

import { cn } from '@/lib/utils'
import { useRoutePath } from '../route-path-provider'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useMap } from '../map-provider'
import { v4 as uuid } from 'uuid'
import { useSelectedLayerStore } from '@/stores/select-layer-store-provider'
import { useLatest } from 'react-use'

const RoutePathSelectingTip = () => {
  const {
    isSelectRoutePoint,
    selectedRoutePoint,
    setIsSelectRoutePoint,
    setSelectedRoutePoint,
  } = useRoutePath()
  const { map } = useMap()
  const handleCancel = () => {
    setIsSelectRoutePoint(false)
    setSelectedRoutePoint([])
  }
  const { setSelectedLayer, selectedLayer } = useSelectedLayerStore(
    (state) => state
  )
  const selectedLayerLatest = useLatest(selectedLayer)
  const isSelectRoutePointLatest = useLatest(isSelectRoutePoint)

  const handleRoute = async (points: L.Marker[]) => {
    const origin = points[0].getLatLng()
    const destination = points[1].getLatLng()
    const data = await fetch('/api/map/route', {
      method: 'POST',
      body: JSON.stringify({
        origin: [origin.lng, origin.lat],
        destination: [destination.lng, destination.lat],
        type: 'walking',
      }),
    })
    const result = await data.json()
    const paths: {
      lng: number
      lat: number
    }[] = []
    result.result.forEach((route: any) => {
      route.paths.forEach((path: any) => {
        path.steps.forEach((step: any) => {
          paths.push(...step.polyline)
        })
      })
    })
    paths.unshift(origin)
    paths.push(destination)
    const polyline = L.polyline(paths, { color: '#9900EF', weight: 8 }).addTo(
      map!
    )
    const polylineWithArrow: L.LayerGroup = (L as any)
      .polylineDecorator(polyline, {
        patterns: [
          {
            offset: 25,
            repeat: 35,
            symbol: (L as any).Symbol.arrowHead({
              pixelSize: 4,
              polygon: false,
              pathOptions: { stroke: true, color: '#FFFFFF' },
            }),
          },
        ],
      })
      .addTo(map!)
    polyline.setValue('id', uuid())
    polyline.setValue('routeType', 'walking')
    polyline.setValue('type', 'route')
    polylineWithArrow.on('click', (e) => {
      L.DomEvent.stopPropagation(e)
      polyline.fire('click', e)
    })
    polyline.on('click', (e) => {
      L.DomEvent.stopPropagation(e)
      if (isSelectRoutePointLatest.current) {
        return
      }
      if (!map!.pm.globalDrawModeEnabled()) {
        // 单选layer
        const allLayers = map!.pm.getGeomanLayers()
        allLayers.forEach((layer: any) => {
          layer.pm.disable()
          layer.pm.disableLayerDrag()
        })
        setSelectedLayer(polyline)
      }
    })

    polyline.bindContextMenu({
      contextmenu: true,
      contextmenuInheritItems: false,
      contextmenuItems: [
        {
          text: '删除',
          callback: () => {
            map!.removeLayer(polyline)
            map!.removeLayer(polylineWithArrow)
          },
        },
      ],
    })

    polyline.on('remove', () => {
      if (selectedLayerLatest.current === polyline) {
        map!.removeLayer(polylineWithArrow)
        setSelectedLayer(null)
      }
    })
  }

  useEffect(() => {
    if (selectedRoutePoint.length === 2 && isSelectRoutePoint) {
      handleRoute(selectedRoutePoint)

      setIsSelectRoutePoint(false)
      setTimeout(() => {
        setSelectedRoutePoint([])
      }, 300)
    }
  }, [selectedRoutePoint])
  return (
    <div
      className={cn(
        'opacity-0 transition fixed bottom-2 left-[50%] transform translate-y-4 -translate-x-1/2 w-30 h-10 px-2 py-2 bg-white border rounded-md z-[9999] border-purple-500 flex items-center gap-2',
        isSelectRoutePoint ? 'opacity-1 translate-y-0' : ''
      )}>
      请选中两个标记点 已选择 {selectedRoutePoint.length} 个
      <Button
        variant="outline"
        className="w-7 h-7 p-0"
        size="sm"
        onClick={handleCancel}>
        <X size={16} />
      </Button>
    </div>
  )
}

export default RoutePathSelectingTip
