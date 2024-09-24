'use server'

import { isRedirectError } from 'next/dist/client/components/redirect'
import { signIn, signUp as register } from '../../auth'

export const signUp = async (prevState, formData) => {
  const data = {
    name: formData.get('name'),
    email: `${formData.get('email')?.trim()}`.toLocaleLowerCase(),
    password: formData.get('password')?.trim(),
  }

  try {
    await register(data)
    await signIn('credentials', {
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
