'use client'

import { useRef, useState, useEffect } from 'react'
import AMapLoader from '@amap/amap-jsapi-loader'

function MapComponent() {
  const mapRef = useRef(null)
  const [amapLoaded, setAmapLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(process.env)
      AMapLoader.load({
        key: process.env.NEXT_PUBLIC_GAODE_MAP_KEY as string,
        version: '2.0',
      }).then((AMap) => {
        setAmapLoaded(true)
        mapRef.current = new AMap.Map('container', {
          // 设置地图容器id
          viewMode: '3D', // 是否为3D地图模式
          zoom: 5, // 初始化地图级别
          center: [105.602725, 22.076636], // 初始化地图中心点位置
        })
      })
    }
  }, [])

  return (
    <>
      {
        <div
          id="container"
          className="map-container"
          style={{ height: '600px', width: '880px' }}
        />
      }
    </>
  )
}

export default MapComponent
