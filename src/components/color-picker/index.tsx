'use client'

import { cn } from '@/lib/utils'
import { isUndefined } from 'lodash-es'
import { Check } from 'lucide-react'
import { useEffect, useLayoutEffect, useState } from 'react'

const DefaultColorList = [
  '#FF6900',
  '#FCB900',
  '#FFEB3B',
  '#7BDCB5',
  '#00D084',
  '#8ED1FC',
  '#3388FF',
  '#ABB8C3',
  '#EB144C',
  '#F78DA7',
  '#9900EF',
  '#795548',
  '#607D8B',
  '#000000',
]

export const ColorPicker = (props: {
  value?: string
  onChange?: (color: string) => void
  defaultValue?: string
}) => {
  const { defaultValue = '#000000' } = props
  const [cmpValue, setCmpValue] = useState(() => {
    if (!isUndefined(props.value)) {
      return props.value
    } else {
      return defaultValue
    }
  })

  const handleChange = (color: string) => {
    props.onChange?.(color)
    if (isUndefined(props.value)) {
      setCmpValue(color)
    }
  }

  useLayoutEffect(() => {
    setCmpValue(props.value ?? defaultValue)
  }, [props.value])

  return (
    <div className="w-[258px] flex flex-wrap gap-[8px]">
      {DefaultColorList.map((color, index) => {
        return (
          <div
            key={index}
            className={cn(
              'w-[30px] h-[30px] rounded-lg cursor-pointer flex justify-center items-center',
              color === '#FFFFFF' && 'border border-gray-300'
            )}
            style={{
              backgroundColor: color,
              boxShadow:
                cmpValue.toUpperCase() === color
                  ? `${color} 0px 0px 4px`
                  : 'none',
            }}
            onClick={() => {
              handleChange(color)
            }}>
            {cmpValue.toUpperCase() === color && <Check color="#ffffff" />}
          </div>
        )
      })}
    </div>
  )
}
