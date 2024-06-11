'use client'

import Script from 'next/script'
import { useRef, useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useMap } from '../map-context'
import { useRouter } from 'next/navigation'
import { addMarker } from '@/lib/map-utils'

import 'leaflet-contextmenu/dist/leaflet.contextmenu.min'
import './context-menu.css'
import './zoom-smooth'

function MapComponent() {
  const mapRef = useRef(null)
  const router = useRouter()
  const { setMap, setHwService } = useMap()
  const loadTimer = useRef<number>()

  useEffect(() => {
    if (mapRef.current) {
      const map = L.map('map', {
        attributionControl: false,
        zoomControl: false,
        scrollWheelZoom: false,
        smoothWheelZoom: true,
        smoothSensitivity: 1.8,
        contextmenu: true,
        contextmenuWidth: 180,
        contextmenuItems: [
          {
            text: '添加标记',
            callback: ({
              latlng,
            }: {
              latlng: { lat: number; lng: number }
            }) => {
              addMarker(map, [latlng.lat, latlng.lng])
            },
          },
          {
            text: '显示坐标',
            callback: ({
              latlng,
            }: {
              latlng: { lat: number; lng: number }
            }) => {
              console.log(latlng)
            },
          },
          {
            text: '作为地图中心',
            callback: ({
              latlng,
            }: {
              latlng: { lat: number; lng: number }
            }) => {
              map.setView(latlng)
            },
          },
          '-',
          {
            text: '地图放大',
            callback: () => {
              map.zoomIn()
            },
          },
          {
            text: '地图缩小',
            callback: () => {
              map.zoomOut()
            },
          },
        ],
        // }).setView([39.904989, 116.405285], 10)
      } as any).setView([40.65880970378552, 109.85357825369704], 16)

      setMap(map)

      L.tileLayer(
        `https://mapapi.cloud.huawei.com/mapApi/v1/mapService/getTile?x={x}&y={y}&z={z}&language=zh&scale=2&key=${encodeURIComponent(
          process.env.NEXT_PUBLIC_HW_MAP_KEY!
        )}`
      ).addTo(map)

      L.control
        .scale({
          position: 'bottomleft', // 设置比例尺的位置，可选值有 'bottomleft', 'bottomright', 'topleft', 'topright'
          imperial: false, // 显示英制单位
          metric: true, // 显示公制单位
          updateWhenIdle: true, // 设置为 true 时，比例尺将在地图空闲时更新
        })
        .addTo(map)

      // test
      addMarker(map, [40.65880970378552, 109.85357825369704])

      return () => {
        map.remove()
      }
    }
  }, [mapRef.current])

  useEffect(() => {
    ;(async () => {
      await new Promise((resolve) => {
        loadTimer.current = window.setInterval(() => {
          if (window.HWMapJsSDK) {
            clearInterval(loadTimer.current)
            resolve(true)
            setHwService(new window.HWMapJsSDK.HWSiteService())
          }
        }, 100)
      })
    })()
  }, [])

  return (
    <>
      <Script
        src={`https://mapapi.cloud.huawei.com/mapjs/v1/api/js?callback=initMap&key=${encodeURIComponent(
          process.env.NEXT_PUBLIC_HW_MAP_KEY!
        )}`}
        onError={() => {
          clearInterval(loadTimer.current)
          router.push('/script-error')
        }}
      />
      <div ref={mapRef} id="map" className="h-full w-full" />
    </>
  )
}

export default MapComponent
