import * as L from 'leaflet'

declare module 'leaflet' {
  interface MapOptions {
    smoothWheelZoom?: boolean
    smoothSensitivity?: number
    contextmenu: boolean
    contextmenuWidth: number
    contextmenuItems: any[]
  }
}
