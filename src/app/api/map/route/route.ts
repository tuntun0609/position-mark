import { RouteType } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const { userId, getToken } = auth()

  if (!userId) {
    return new NextResponse('User is not signed in.', { status: 401 })
  }

  const {
    origin,
    destination,
    type,
  }: {
    origin: [number, number]
    destination: [number, number]
    type: RouteType
  } = await req.json()
  let baseUrl = ''
  switch (type) {
    case RouteType.Walking:
      baseUrl = `https://mapapi.cloud.huawei.com/mapApi/v1/routeService/walking?key=${encodeURIComponent(
        process.env.NEXT_PUBLIC_HW_MAP_KEY!
      )}`
      break
    case RouteType.Bicycling:
      baseUrl = `https://mapapi.cloud.huawei.com/mapApi/v1/routeService/bicycling?key=${encodeURIComponent(
        process.env.NEXT_PUBLIC_HW_MAP_KEY!
      )}`
      break
    case RouteType.Driving:
      baseUrl = `https://mapapi.cloud.huawei.com/mapApi/v1/routeService/driving?key=${encodeURIComponent(
        process.env.NEXT_PUBLIC_HW_MAP_KEY!
      )}`
      break
    default:
      break
  }
  try {
    const data = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origin: {
          lng: origin[0],
          lat: origin[1],
        },
        destination: {
          lng: destination[0],
          lat: destination[1],
        },
        language: 'zh_CN',
      }),
    })
    return NextResponse.json({
      code: 200,
      message: 'success',
      result: (await data.json()).routes,
    })
  } catch (error) {
    return NextResponse.json(new Error('Error'), { status: 500 })
  }
}
