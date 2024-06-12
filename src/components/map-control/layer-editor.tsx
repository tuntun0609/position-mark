'use client'

import { useSelectedLayerStore } from '@/stores/select-layer-store-provider'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { isNil } from 'lodash-es'
import { Card } from '../ui/card'
import Image from 'next/image'
import { ColorPicker } from '../color-picker'

export enum LayerType {
  Marker = 'marker',
  Rectangle = 'rectangle',
  Polyline = 'polyline',
}

const LayerEditor = () => {
  const [showEditor, setShowEditor] = useState(false)
  const { selectedLayer } = useSelectedLayerStore((state) => state)
  const [layerType, setLayerType] = useState<LayerType>()
  const [color, setColor] = useState<string>('#000000')

  useEffect(() => {
    setShowEditor(true)
    if (!isNil(selectedLayer)) {
      if (selectedLayer instanceof L.Marker) {
        setLayerType(LayerType.Marker)
      } else if (selectedLayer instanceof L.Rectangle) {
        // 获取颜色
        const color = selectedLayer.options.color
        if (color) {
          setColor(color)
        }
        setLayerType(LayerType.Rectangle)
      } else if (selectedLayer instanceof L.Polyline) {
        setLayerType(LayerType.Polyline)
      }
    }
  }, [selectedLayer])

  return (
    <div
      className="fixed top-2 right-2 z-[99999] ease-in 
    transition">
      {!isNil(selectedLayer) &&
        (showEditor ? (
          <Card className="w-[350px] min-h-[350px] absolute top-0 right-0 p-2">
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
            <div className="p-2">
              <div className="colorPicker">
                <p className="mb-1 font-bold">颜色:</p>
                <ColorPicker
                  value={color}
                  onChange={(color) => {
                    setColor(color)
                    // 修改layer颜色
                    if (
                      selectedLayer instanceof L.Polyline ||
                      selectedLayer instanceof L.Rectangle
                    ) {
                      selectedLayer.setStyle({ color })
                    }
                  }}
                />
              </div>
            </div>
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
