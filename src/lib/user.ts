import { currentUser } from '@clerk/nextjs/server'

export const getUser = async () => {
  try {
    const user = await currentUser()
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      return null
    }
    const email = user.emailAddresses[0].emailAddress
    const nickname = user.firstName
    const avatarUrl = user.imageUrl
    return {
      email: email,
      nickname: nickname || '',
      avatar_url: avatarUrl,
    }
  } catch (error) {
    return null
  }
}
