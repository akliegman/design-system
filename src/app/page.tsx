import { Metadata } from "next";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return <main className={styles["main"]}>Hello world!</main>;
}
