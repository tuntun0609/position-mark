import L from 'leaflet'
import { renderToString } from 'react-dom/server'

export const addMarker = (map: L.Map, Coord: [number, number]) => {
  // const markerIcon = L.icon({
  // iconUrl: '/icons/marker.svg',
  // iconSize: [30, 40],
  // iconAnchor: [15, 40],
  // popupAnchor: [0, -44],
  // tooltipAnchor: [0, -44],
  // })

  const markerIcon = L.divIcon({
    html: renderToString(
      <div className="rounded-full w-6 h-6 bg-white flex justify-center items-center border border-purple-200 shadow-lg">
        <div className="rounded-full w-4 h-4 bg-purple-500"></div>
      </div>
    ),
    className: 'divIconContainer',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    tooltipAnchor: [0, -12],
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
    ],
  } as any).addTo(map)

  return marker
}
