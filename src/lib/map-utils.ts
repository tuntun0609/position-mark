import L from 'leaflet'

export const addMarker = (map: L.Map, Coord: [number, number]) => {
  const markerIcon = L.icon({
    iconUrl: '/icons/marker.svg',
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [15, -20],
  })

  const marker = L.marker(Coord, {
    icon: markerIcon,
    contextmenu: true,
    contextmenuInheritItems: false,
    contextmenuItems: [
      {
        text: '删除',
        callback: () => {
          map.removeLayer(marker)
        },
      },
      {
        text: 'log',
        callback: () => {
          console.log(marker)
        },
      },
    ],
  } as any).addTo(map)

  return marker
}
