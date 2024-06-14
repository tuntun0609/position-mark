import { selectedLayerStore } from '@/stores/select-layer-store-provider'
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
    ],
  } as any).addTo(map)

  marker.on('click', (e) => {
    L.DomEvent.stopPropagation(e)
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
      selectedLayerStore.setState({ selectedLayer: e.target })
    }
  })

  marker.on('remove', () => {
    if (selectedLayerStore.getState().selectedLayer === marker) {
      selectedLayerStore.setState({ selectedLayer: null })
    }
  })

  return marker
}
