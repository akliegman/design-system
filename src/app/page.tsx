import { Metadata } from "next";

import { HomeButton } from "@/components/page";

import styles from "@/app/styles.module.scss";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main className={styles["main"]}>
      <HomeButton />
    </main>
  );
}
