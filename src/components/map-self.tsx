'use client'

import Script from 'next/script'
import { useRef, useState, useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

function MapComponent() {
  const mapRef = useRef(null)

  useEffect(() => {
    const map = L.map('map').setView([39.904989, 116.405285], 13)

    L.tileLayer(
      `https://mapapi.cloud.huawei.com/mapApi/v1/mapService/getTile?x={x}&y={y}&z={z}&language=zh&scale=2&key=${encodeURIComponent(
        process.env.NEXT_PUBLIC_HW_MAP_KEY!
      )}`
    ).addTo(map)

    L.marker([39.904989, 116.405285])
      .addTo(map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      .openPopup()

    return () => {
      map.remove()
    }
  }, [])

  return (
    <>
      <div ref={mapRef} id="map" style={{ height: '600px', width: '880px' }} />
    </>
  )
}

export default MapComponent
