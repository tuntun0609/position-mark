import * as L from 'leaflet'

declare module 'leaflet' {
  interface Layer {
    bindContextMenu: (options: {
      contextmenu?: boolean
      contextmenuWidth?: number
      contextmenuItems?: any[]
      contextmenuInheritItems?: boolean
    }) => void
  }

  interface MapOptions {
    smoothWheelZoom?: boolean
    smoothSensitivity?: number
    contextmenu?: boolean
    contextmenuWidth?: number
    contextmenuItems?: any[]
    contextmenuInheritItems?: boolean
  }
}
