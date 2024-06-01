'use client'
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface MapContextType {
  map: L.Map | null
  setMap: Dispatch<SetStateAction<L.Map | null>>
  hwService: any
  setHwService: Dispatch<SetStateAction<any>>
}

const MapContext = createContext<MapContextType>({} as MapContextType)

export const MapProvider: FC<{
  children: ReactNode
}> = ({ children }) => {
  const [map, setMap] = useState<L.Map | null>(null)
  const [hwService, setHwService] = useState<any>(null)

  return (
    <MapContext.Provider value={{ map, setMap, hwService, setHwService }}>
      {children}
    </MapContext.Provider>
  )
}

export const useMap = () => {
  const context = useContext(MapContext)
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider')
  }
  return context
}
