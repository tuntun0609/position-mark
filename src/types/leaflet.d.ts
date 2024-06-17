import * as L from 'leaflet'

declare module 'leaflet' {
  interface Layer {
    bindContextMenu: (options: {
      contextmenu?: boolean
      contextmenuWidth?: number
      contextmenuItems?: any[]
      contextmenuInheritItems?: boolean
    }) => void

    _customData: Record<string, any>

    setValue: (key: string, value: any) => void

    getValue: (key: string) => any
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
