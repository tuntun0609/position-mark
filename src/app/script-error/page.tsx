'use client'

import { useRouter } from 'next/navigation'

const HWScriptErrorPage = () => {
  const router = useRouter()
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-9xl font-black text-gray-200">Error</h1>
      <p className="mt-4 text-gray-500">加载数据错误啦！</p>

      <div
        onClick={() => {
          router.replace('/')
        }}
        className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
        重新加载
      </div>
    </div>
  )
}

export default HWScriptErrorPage
