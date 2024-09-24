import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <div className={styles.id}>
          <h2 className={styles.title}>Hi, Bruno!</h2>
          <p>Your are logged in with <span className={styles.email}>bruno@bruno</span></p>
        </div>

        <div className={styles.ctas}>
          <a className={styles.primary}>
           Logout
          </a>
        </div>
      </main>
    </div>
  );
}
