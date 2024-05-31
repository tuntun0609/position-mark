'use client'

import Script from 'next/script'
import { useRef, useState, useEffect } from 'react'

function MapComponent() {
  const mapRef = useRef(null)

  const onSDKReady = async () => {
    // 监听window上是否有HWMapJsSDK对象
    await new Promise((resolve) => {
      const timer = setInterval(() => {
        if (window.HWMapJsSDK) {
          clearInterval(timer)
          resolve(null)
        }
      }, 100)
    })

    const mapOptions = {} as any
    // 设置地图中心点坐标
    mapOptions.center = { lat: 39.904989, lng: 116.405285 }
    // 设置地图初始化缩放级别
    mapOptions.zoom = 8
    // 设置地图语言
    mapOptions.language = 'ENG'
    // 设置地图加载时使用的瓦片类型，支持vector（矢量）或raster（栅格）
    mapOptions.sourceType = 'raster'
    // 创建地图对象
    const map = new window.HWMapJsSDK.HWMap(mapRef.current, mapOptions)
  }

  return (
    <>
      <Script
        src={`https://mapapi.cloud.huawei.com/mapjs/v1/api/js?callback=initMap&key=${encodeURIComponent(
          process.env.NEXT_PUBLIC_HW_MAP_KEY!
        )}`}
        onReady={() => {
          onSDKReady()
        }}
      />
      <div
        ref={mapRef}
        id="container"
        className="map-container"
        style={{ height: '600px', width: '880px' }}
      />
    </>
  )
}

export default MapComponent
