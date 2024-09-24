'use client';

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Login</h2>

        <form className={styles.form}>
        <label htmlFor='username'>Name</label>
          <input
            className={styles.input}
            type="text"
            placeholder="name"
          />

          <label htmlFor='username'>Email</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Username"
          />

          <label htmlFor='password'>Password</label>
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
          />

          <div className={styles.ctas}>
            <button
              type="submit"
              className={styles.primary}
            >
              Login
            </button>
          </div>
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
