import {currentUser, redirectToSignIn} from '@clerk/nextjs'

import {db} from '@/lib/db'

export const initialUser = async () => {
  const userClerk = await currentUser()

  if (!userClerk) {
    return redirectToSignIn()
  }

  const user = await db.user.findUnique({
    where: {
      userId: userClerk.id,
    },
  })

  if (user) {
    const updatedUser = await db.user.update({
      where: {
        userId: userClerk.id,
      },
      data: {
        name: `${userClerk.username}`,
        imageUrl: userClerk.imageUrl,
      },
    })
    return updatedUser
  }

  const newUser = await db.user.create({
    data: {
      userId: userClerk.id,
      name: `${userClerk.username}`,
      imageUrl: userClerk.imageUrl,
    },
  })

  return newUser
}
