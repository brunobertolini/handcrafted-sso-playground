import styles from "./page.module.css";
import { auth } from "../auth";
import { redirect } from "next/navigation";

import { LogoutButton } from "./logout-button";

export default async function Home() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <div className={styles.id}>
          <h2 className={styles.title}>Hi, {session?.user?.name}!</h2>
          <p>Your are logged in with <span className={styles.email}>{session?.user?.email}</span></p>
        </div>

        <div className={styles.ctas}>
          <LogoutButton className={styles.primary} />
        </div>
      </main>
    </div>
  );
}
