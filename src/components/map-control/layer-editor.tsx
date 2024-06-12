'use client'

import { useSelectedLayerStore } from '@/stores/select-layer-store-provider'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { isNil } from 'lodash-es'
import { Card } from '../ui/card'
import Image from 'next/image'

const LayerEditor = () => {
  const [showEditor, setShowEditor] = useState(false)
  const { selectedLayer } = useSelectedLayerStore((state) => state)

  useEffect(() => {
    setShowEditor(true)
  }, [selectedLayer])

  return (
    <div className="fixed top-2 right-2 z-[99999] ease-in">
      {!isNil(selectedLayer) &&
        (showEditor ? (
          <Card className="w-[350px] min-h-[350px] absolute top-0 right-0 p-2">
            <div className="flex justify-between items-center">
              <div className="font-bold text-xl ml-2">编辑</div>
              <Button
                variant="ghost"
                className="p-2"
                onClick={() => {
                  setShowEditor(false)
                }}>
                <X />
              </Button>
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
