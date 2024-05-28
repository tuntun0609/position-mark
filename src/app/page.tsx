import dynamic from 'next/dynamic'
import Image from 'next/image'

const MapComponent = dynamic(() => import('../components/map'), { ssr: false })

export default function Home() {
  return (
    <main className="flex min-h-screen items-center">
      <MapComponent />
    </main>
  )
}
