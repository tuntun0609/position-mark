'use client'

import { cn } from '@/lib/utils'
import { useRoutePath } from '../route-path-provider'

const RoutePathSelectingTip = () => {
  const { isSelectRoutePoint, selectedRoutePoint } = useRoutePath()
  return (
    <div
      className={cn(
        'opacity-0 transition absolute bottom-2 left-[50%] transform translate-y-4 -translate-x-1/2 w-30 h-10 px-4 py-2 bg-white border rounded-md z-[9999] border-purple-500',
        isSelectRoutePoint ? 'opacity-1 translate-y-0' : ''
      )}>
      请选中两个标记点 已选择 {selectedRoutePoint.length} 个
    </div>
  )
}

export default RoutePathSelectingTip
