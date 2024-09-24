'use client';

import { useFormState, useFormStatus } from 'react-dom'
import styles from "./page.module.css";

import { signUp } from './action'

const FormContent = () => {
  const { pending } = useFormStatus()

  return (
    <>
      <label htmlFor='username'>Name</label>
      <input
        className={styles.input}
        type="text"
        name="name"
        id="name"
        placeholder="name"
      />

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

export default function Home() {
  const [formState, formAction] = useFormState(signUp, {})

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Sign Up</h2>

        <form className={styles.form} action={formAction}>
          <FormContent formState={formState} />
        </form>
      </main>
      <footer className={styles.footer}>
        <a href="/login">
          Login
        </a>
      </footer>
    </div>
  );
}
