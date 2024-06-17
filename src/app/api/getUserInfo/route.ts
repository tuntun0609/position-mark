import { currentUser } from '@clerk/nextjs/server'

export async function GET() {
  const user = await currentUser()
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return
  }
}
