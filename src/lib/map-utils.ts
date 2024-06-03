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
  }).addTo(map)

  return marker
}
