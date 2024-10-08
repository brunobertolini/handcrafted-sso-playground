'use client';

import { useFormState, useFormStatus } from 'react-dom'
import styles from "./page.module.css";

import { signIn } from './action'

const FormContent = ({ formState }) => {
  const { pending } = useFormStatus()

  return (
    <>
      <input type="hidden" name="callbackUrl" value={formState?.callbackUrl} />

      <label htmlFor='email'>Email</label>
      <input
        className={styles.input}
        type="text"
        name="email"
        id="email"
        placeholder="email"
      />

      <label htmlFor='password'>Password</label>
      <input
        className={styles.input}
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />

      <div className={styles.ctas}>
        <button
          type="submit"
          className={styles.primary}
          disabled={pending}
        >
          Login
        </button>
      </div>
    </>
  )
}

export default function Home({ searchParams }) {
  const [formState, formAction] = useFormState(signIn, {
    callbackUrl: searchParams.callbackUrl
  })

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Login</h2>

        <form className={styles.form} action={formAction}>
          <FormContent formState={formState} />
        </form>
      </main>
      <footer className={styles.footer}>
        <a href="/signup">
          Sign Up
        </a>
      </footer>
    </div>
  );
}
