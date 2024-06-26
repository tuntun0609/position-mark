'use client'

import Script from 'next/script'
import { useRef, useEffect, useState } from 'react'
import L, { Layer, LeafletMouseEventHandlerFn } from 'leaflet'
import { useMap } from '../map-provider'
import { useRouter } from 'next/navigation'
import { addMarker } from '@/lib/map-utils'
import '@geoman-io/leaflet-geoman-free'
import 'leaflet/dist/leaflet.css'
import './leaflet-geoman.css'
import { v4 as uuid } from 'uuid'

import 'leaflet-contextmenu/dist/leaflet.contextmenu.min'
import './context-menu.css'
import './zoom-smooth'
import './custom-value'
import 'leaflet-polylinedecorator'
import { useSelectedLayerStore } from '@/stores/select-layer-store-provider'

import styles from './index.module.css'
import { cn } from '@/lib/utils'
import { useLatest } from 'react-use'
import { useRoutePath } from '../route-path-provider'

function MapComponent() {
  const router = useRouter()
  const { setMap, setHwService } = useMap()
  const loadTimer = useRef<number>()
  const { selectedLayer, setSelectedLayer } = useSelectedLayerStore(
    (state) => state
  )
  const selectedLayerLatest = useLatest(selectedLayer)
  const [isDragging, setIsDragging] = useState(false)
  const { isSelectRoutePoint, setSelectedRoutePoint, selectedRoutePoint } =
    useRoutePath()
  const isSelectRoutePointLatest = useLatest(isSelectRoutePoint)

  const addPathEvent = (map: L.Map, layer: Layer) => {
    layer.setValue('id', uuid())
    layer.on('click', (e) => {
      L.DomEvent.stopPropagation(e)
      if (isSelectRoutePointLatest.current) {
        return
      }
      if (!map.pm.globalDrawModeEnabled()) {
        // 单选layer
        const allLayers = map.pm.getGeomanLayers()
        allLayers.forEach((layer: any) => {
          layer.pm.disable()
          layer.pm.disableLayerDrag()
        })
        e.target.pm.enableLayerDrag()
        e.target.pm.enable({
          allowSelfIntersection: false,
        })
        setSelectedLayer(e.target)
      }
    })

    layer.on('pm:drag', () => {
      setIsDragging(true)
    })

    layer.on('pm:dragend', () => {
      setIsDragging(false)
    })

    layer.bindContextMenu({
      contextmenu: true,
      contextmenuInheritItems: false,
      contextmenuItems: [
        {
          text: '删除',
          callback: () => {
            map.removeLayer(layer)
          },
        },
      ],
    })

    layer.on('remove', () => {
      if (selectedLayerLatest.current === layer) {
        setSelectedLayer(null)
      }
    })
  }

  const addMarkerEvent = (map: L.Map, marker: L.Marker) => {
    marker.on('click', (e) => {
      L.DomEvent.stopPropagation(e)
      if (isSelectRoutePointLatest.current) {
        setSelectedRoutePoint((preValue) => {
          if (preValue.length < 2 && !preValue.includes(marker)) {
            return [...preValue, marker]
          }
          return preValue
        })
        return
      }
      if (!map.pm.globalDrawModeEnabled()) {
        // 单选layer
        const allLayers = map.pm.getGeomanLayers()
        allLayers.forEach((layer: any) => {
          layer.pm.disable()
          layer.pm.disableLayerDrag()
        })
        e.target.pm.enableLayerDrag()
        e.target.pm.enable({
          allowSelfIntersection: false,
          preventMarkerRemoval: true,
        })
        setSelectedLayer(e.target)
      }
    })

    marker.on('remove', () => {
      if (selectedLayerLatest.current === marker) {
        setSelectedLayer(null)
      }
    })
  }

  useEffect(() => {
    const map = L.map('map', {
      doubleClickZoom: false,
      attributionControl: false,
      zoomControl: false,
      zoomSnap: 0.1,
      scrollWheelZoom: false,
      smoothWheelZoom: true,
      smoothSensitivity: 1.8,
      contextmenu: true,
      contextmenuWidth: 180,
      contextmenuItems: [
        {
          text: '添加标记',
          callback: ({ latlng }: { latlng: { lat: number; lng: number } }) => {
            const marker = addMarker(map, [latlng.lat, latlng.lng])
            addMarkerEvent(map, marker)
          },
        },
        {
          text: '显示坐标',
          callback: ({ latlng }: { latlng: { lat: number; lng: number } }) => {
            console.log(latlng)
          },
        },
        {
          text: '作为地图中心',
          callback: ({ latlng }: { latlng: { lat: number; lng: number } }) => {
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
    }).setView([40.65880970378552, 109.85357825369704], 16)

    setMap(map)

    const tileLayer = L.tileLayer(
      `https://mapapi.cloud.huawei.com/mapApi/v1/mapService/getTile?x={x}&y={y}&z={z}&language=zh&scale=2&key=${encodeURIComponent(
        process.env.NEXT_PUBLIC_HW_MAP_KEY!
      )}`
    )
    tileLayer.addTo(map)

    map.pm.setLang('zh')

    map.on('click', () => {
      const layers = map.pm.getGeomanLayers()
      layers.forEach((layer: any) => {
        layer.pm.disable()
        layer.pm.disableLayerDrag()
      })
      setSelectedLayer(null)
    })

    map.on('pm:create', (e) => {
      const addLayer = e.layer as L.Path
      addPathEvent(map, addLayer)
    })

    L.control
      .scale({
        position: 'bottomright', // 设置比例尺的位置，可选值有 'bottomleft', 'bottomright', 'topleft', 'topright'
        imperial: false, // 显示英制单位
        metric: true, // 显示公制单位
        // updateWhenIdle: true,  设置为 true 时，比例尺将在地图空闲时更新
      })
      .addTo(map)

    // test
    const testMarker = addMarker(map, [40.65880970378552, 109.85357825369704])
    addMarkerEvent(map, testMarker)

    addMarkerEvent(map, addMarker(map, [40.66670092705389, 109.84070524949709]))

    return () => {
      map.remove()
    }
  }, [])

  useEffect(() => {
    setSelectedLayer(null)
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
          router.push('/map/script-error')
        }}
      />
      <div className={cn('h-full w-full', isDragging && styles.dragging)}>
        <div id="map" className={cn('h-full w-full')} />
      </div>
    </>
  )
}

export default MapComponent
