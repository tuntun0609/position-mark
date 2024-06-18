'use client'

import * as L from 'leaflet'

import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface IRoutePathContext {
  isSelectRoutePoint: boolean
  setIsSelectRoutePoint: Dispatch<SetStateAction<boolean>>
  selectedRoutePoint: L.Marker[]
  setSelectedRoutePoint: Dispatch<SetStateAction<L.Marker<any>[]>>
}

export const RoutePathContext = createContext<IRoutePathContext>(
  {} as IRoutePathContext
)

export const RoutePathProvider: FC<{
  children: ReactNode
}> = ({ children }) => {
  const [isSelectRoutePoint, setIsSelectRoutePoint] = useState(false)
  const [selectedRoutePoint, setSelectedRoutePoint] = useState<L.Marker[]>([])

  return (
    <RoutePathContext.Provider
      value={{
        isSelectRoutePoint,
        setIsSelectRoutePoint,
        selectedRoutePoint,
        setSelectedRoutePoint,
      }}>
      {children}
    </RoutePathContext.Provider>
  )
}

export const useRoutePath = () => {
  const context = useContext(RoutePathContext)
  if (context === undefined) {
    throw new Error('useRoutePath must be used within a RoutePathProvider')
  }
  return context
}
