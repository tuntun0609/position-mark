'use client'

import { useSelectedLayerStore } from '@/stores/select-layer-store-provider'
import { Button } from '../ui/button'
import { Bike, CarFront, CircleAlert, Footprints, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { isNil } from 'lodash-es'
import { Card } from '../ui/card'
import Image from 'next/image'
import { ColorPicker } from '../color-picker'
import { Slider } from '../ui/slider'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { RouteType } from '@/types'
import { renderToString } from 'react-dom/server'

export enum LayerType {
  Marker = 'marker',
  Rectangle = 'rectangle',
  Polyline = 'polyline',
  Polygon = 'polygon',
}

const PolylineEditor = (props: { layer: L.Polyline }) => {
  const { layer } = props
  const [color, setColor] = useState<string>('#000000')
  const [opacity, setOpacity] = useState<number>(100)
  const [width, setWidth] = useState<number>(3)
  const [isRoutePath, setIsRoutePath] = useState<boolean>(false)
  const [routeType, setRouteType] = useState<RouteType>()

  const onColorChange = (color: string) => {
    setColor(color)
    layer.setStyle({ color })
    if (isRoutePath) {
      return
    }
    layer.pm.disable()
    layer.pm.disableLayerDrag()
    setTimeout(() => {
      layer.pm.enableLayerDrag()
      layer.pm.enable({
        allowSelfIntersection: false,
      })
    })
  }

  const onOpacityChange = (value: number[]) => {
    setOpacity(value[0])
    const opacity = value[0] / 100
    layer?.setStyle({ opacity })
  }

  const onWidthChange = (value: number[]) => {
    setWidth(value[0])
    const weight = value[0]
    layer?.setStyle({ weight })
  }

  const onRouteTypeChange = async (value: RouteType) => {
    setRouteType(value)
    layer.setValue('routeType', value)
    // 获取路径数组
    const latlngs = layer.getLatLngs()
    const origin = latlngs[0] as L.LatLng
    const destination = latlngs[latlngs.length - 1] as L.LatLng
    const data = await fetch('/api/map/route', {
      method: 'POST',
      body: JSON.stringify({
        origin: [origin.lng, origin.lat],
        destination: [destination.lng, destination.lat],
        type: value,
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
    layer.setLatLngs(paths)
  }

  useEffect(() => {
    if (layer.getValue('type') === 'route') {
      setIsRoutePath(true)
      setRouteType(layer.getValue('routeType'))
    }
    const color = layer.options.color
    const opacity = layer.options.opacity
    const weight = layer.options.weight
    if (color) {
      setColor(color)
    }
    if (opacity) {
      setOpacity(opacity * 100)
    }
    if (weight) {
      setWidth(weight)
    }
  }, [layer])

  return (
    <div className="p-2 pt-4 flex flex-col w-full gap-6">
      <div className="colorPicker">
        <p className="mb-2 font-bold">颜色:</p>
        <div className="flex justify-center item-center">
          <ColorPicker value={color} onChange={onColorChange} />
        </div>
      </div>
      <div className="opacity">
        <p className="mb-2 font-bold">透明度: {opacity / 100}</p>
        <Slider
          defaultValue={[100]}
          max={100}
          step={1}
          className={cn('w-full')}
          value={[opacity]}
          onValueChange={onOpacityChange}
        />
      </div>
      <div className="width">
        <p className="mb-2 font-bold">宽度: {width}</p>
        <Slider
          defaultValue={[100]}
          max={20}
          min={1}
          step={1}
          className={cn('w-full')}
          value={[width]}
          onValueChange={onWidthChange}
        />
      </div>

      {isRoutePath && (
        <div className="routeType">
          <div>
            <Tabs
              value={routeType}
              defaultValue={RouteType.Walking}
              onValueChange={(value) => onRouteTypeChange(value as RouteType)}>
              <TabsList className="w-full">
                <TabsTrigger
                  className="flex-1 flex items-center gap-2"
                  value={RouteType.Walking}>
                  <Footprints size={20} />
                  步行
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 flex items-center gap-2"
                  value={RouteType.Bicycling}>
                  <Bike size={20} />
                  骑行
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 flex items-center gap-2"
                  value={RouteType.Driving}>
                  <CarFront size={20} />
                  驾车
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  )
}

const PolygonEditor = (props: { layer: L.Rectangle | L.Polygon }) => {
  const { layer } = props
  const [color, setColor] = useState<string>('#000000')
  const [opacity, setOpacity] = useState<number>(100)
  const [width, setWidth] = useState<number>(3)
  const [fillColor, setFillColor] = useState('#000000')
  const [fillOpacity, setFillOpacity] = useState<number>(20)

  const onColorChange = (color: string) => {
    setColor(color)
    layer.setStyle({ color })
    layer.pm.disable()
    layer.pm.disableLayerDrag()
    setTimeout(() => {
      layer.pm.enableLayerDrag()
      layer.pm.enable({
        allowSelfIntersection: false,
      })
    })
  }

  const onOpacityChange = (value: number[]) => {
    setOpacity(value[0])
    const opacity = value[0] / 100
    layer?.setStyle({ opacity })
  }

  const onWidthChange = (value: number[]) => {
    setWidth(value[0])
    const weight = value[0]
    layer?.setStyle({ weight })
  }

  const onFillColorChange = (color: string) => {
    setFillColor(color)
    layer.setStyle({ fillColor: color })
    layer.pm.disable()
    layer.pm.disableLayerDrag()
    setTimeout(() => {
      layer.pm.enableLayerDrag()
      layer.pm.enable({
        allowSelfIntersection: false,
      })
    })
  }

  const onFillOpacityChange = (value: number[]) => {
    setFillOpacity(value[0])
    const fillOpacity = value[0] / 100
    layer?.setStyle({ fillOpacity })
  }

  useEffect(() => {
    const color = layer.options.color
    const opacity = layer.options.opacity
    const weight = layer.options.weight
    const fillColor = layer.options.fillColor
    const fillOpacity = layer.options.fillOpacity
    if (color) {
      setColor(color)
    }
    if (opacity) {
      setOpacity(opacity * 100)
    }
    if (weight) {
      setWidth(weight)
    }
    if (fillColor) {
      setFillColor(fillColor)
    } else if (color) {
      setFillColor(color)
    }
    if (fillOpacity) {
      setFillOpacity(fillOpacity * 100)
    }
  }, [layer])

  return (
    <div className="p-2 pt-4 flex flex-col w-full gap-6">
      <div className="colorPicker">
        <p className="mb-2 font-bold">颜色:</p>
        <div className="flex justify-center item-center">
          <ColorPicker value={color} onChange={onColorChange} />
        </div>
      </div>
      <div className="opacity">
        <p className="mb-2 font-bold">边框透明度: {opacity / 100}</p>
        <Slider
          defaultValue={[100]}
          max={100}
          step={1}
          className={cn('w-full')}
          value={[opacity]}
          onValueChange={onOpacityChange}
        />
      </div>
      <div className="width">
        <p className="mb-2 font-bold">边框宽度: {width}</p>
        <Slider
          defaultValue={[100]}
          max={20}
          min={1}
          step={1}
          className={cn('w-full')}
          value={[width]}
          onValueChange={onWidthChange}
        />
      </div>
      <div className="colorPicker">
        <p className="mb-2 font-bold">填充颜色:</p>
        <div className="flex justify-center item-center">
          <ColorPicker value={fillColor} onChange={onFillColorChange} />
        </div>
      </div>
      <div className="fillOpacity">
        <p className="mb-2 font-bold">填充透明度: {fillOpacity / 100}</p>
        <Slider
          defaultValue={[100]}
          max={100}
          step={1}
          className={cn('w-full')}
          value={[fillOpacity]}
          onValueChange={onFillOpacityChange}
        />
      </div>
    </div>
  )
}

const MarkerEditor = (props: { layer: L.Marker }) => {
  const { layer } = props
  const [topTipContent, setTopTipContent] = useState<string>('')

  useEffect(() => {
    const _topTipContent = layer.getTooltip()?.getContent() ?? ''
    setTopTipContent(_topTipContent as string)
  }, [layer])

  useEffect(() => {
    if (topTipContent) {
      layer
        .bindTooltip(topTipContent, {
          direction: 'top',
        })
        .openTooltip()
    }
  }, [topTipContent])

  return (
    <div className="p-2 pt-4 flex flex-col w-full gap-6">
      <div>
        <p className="mb-2 font-bold flex items-center gap-2">
          <CircleAlert className="text-primary" size={14} />
          标记文本:
        </p>
        <Input
          value={topTipContent}
          onChange={(e) => {
            setTopTipContent(e.target.value)
          }}
          placeholder="标记文本"
        />
      </div>
    </div>
  )
}

const LayerEditor = () => {
  const [showEditor, setShowEditor] = useState(false)
  const { selectedLayer } = useSelectedLayerStore((state) => state)
  const [layerType, setLayerType] = useState<LayerType>()

  useEffect(() => {
    if (isNil(selectedLayer)) {
      return
    }
    setShowEditor(true)
    if (selectedLayer instanceof L.Marker) {
      setLayerType(LayerType.Marker)
    } else if (selectedLayer instanceof L.Rectangle) {
      setLayerType(LayerType.Rectangle)
    } else if (selectedLayer instanceof L.Polygon) {
      setLayerType(LayerType.Polygon)
    } else if (selectedLayer instanceof L.Polyline) {
      setLayerType(LayerType.Polyline)
    }
  }, [selectedLayer])

  return (
    <div
      className="fixed top-2 right-2 z-[9999] ease-in 
    transition">
      {!isNil(selectedLayer) &&
        (showEditor ? (
          <Card className="w-[300px] min-h-[350px] absolute top-0 right-0 p-2 pb-4">
            <div className="flex justify-between items-center">
              <div className="font-bold text-xl ml-2">编辑 {layerType}</div>
              <Button
                variant="ghost"
                className="p-2"
                onClick={() => {
                  setShowEditor(false)
                }}>
                <X />
              </Button>
            </div>
            {layerType === LayerType.Polyline && (
              <PolylineEditor layer={selectedLayer as L.Polyline} />
            )}
            {(layerType === LayerType.Rectangle ||
              layerType === LayerType.Polygon) && (
              <PolygonEditor layer={selectedLayer as L.Rectangle | L.Polygon} />
            )}
            {layerType === LayerType.Marker && (
              <MarkerEditor layer={selectedLayer as L.Marker} />
            )}
          </Card>
        ) : (
          <Button
            variant="outline"
            className="p-2 absolute top-2 right-2 w-10"
            onClick={() => {
              setShowEditor(true)
            }}>
            <Image src="/icons/edit.svg" alt="edit" width={22} height={22} />
          </Button>
        ))}
    </div>
  )
}

export default LayerEditor
