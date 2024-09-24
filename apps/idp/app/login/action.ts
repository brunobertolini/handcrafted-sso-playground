'use server'

import { isRedirectError } from 'next/dist/client/components/redirect'
import { signIn as authSignIn } from '../../auth'

export const signIn = async (prevState, formData) => {
  const data = {
    email: `${formData.get('email')?.trim()}`.toLocaleLowerCase(),
    password: formData.get('password')?.trim(),
  }

  try {
    await authSignIn('credentials', {
      ...data,
      redirectTo: '/'
    })
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }

    return {
      hash: Math.random(),
      message: 'Ops! Try again.',
    }
  }
}
