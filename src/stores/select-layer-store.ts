import { Layer } from 'leaflet'
import { createStore } from 'zustand/vanilla'

export type SelectedLayerState = {
  selectedLayer?: Layer | null
}

export type SelectedLayerActions = {
  setSelectedLayer: (layer: Layer | null) => void
}

export type SelectedLayerStore = SelectedLayerState & SelectedLayerActions

export const defaultInitState: SelectedLayerState = {}

export const createSelectedLayerStore = (
  initState: SelectedLayerState = defaultInitState
) => {
  return createStore<SelectedLayerStore>()((set) => ({
    ...initState,
    setSelectedLayer: (layer: Layer | null) =>
      set(() => ({ selectedLayer: layer })),
  }))
}
