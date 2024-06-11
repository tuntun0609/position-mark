// src/providers/counter-store-provider.tsx
'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type SelectedLayerStore,
  createSelectedLayerStore,
} from '@/stores/select-layer-store'

export type SelectedLayerStoreApi = ReturnType<typeof createSelectedLayerStore>

export const SelectedLayerContext = createContext<
  SelectedLayerStoreApi | undefined
>(undefined)

export interface SelectedLayerProviderProps {
  children: ReactNode
}

export const SelectedLayerProvider = ({
  children,
}: SelectedLayerProviderProps) => {
  const storeRef = useRef<SelectedLayerStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createSelectedLayerStore()
  }

  return (
    <SelectedLayerContext.Provider value={storeRef.current}>
      {children}
    </SelectedLayerContext.Provider>
  )
}

export const useSelectedLayerStore = <T,>(
  selector: (store: SelectedLayerStore) => T
): T => {
  const selectedLayerStoreContext = useContext(SelectedLayerContext)

  if (!selectedLayerStoreContext) {
    throw new Error(
      `useSelectedLayerStore must be used within SelectedLayerProvider`
    )
  }

  return useStore(selectedLayerStoreContext, selector)
}
