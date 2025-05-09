import React from "react";
import Header from "../../components/layout/Header";
import Banner from "../../components/home/Banner";
import UpcomingEvents from "../../components/home/UpcomingEvents";
import GenreRanking from "../../components/home/GenreRanking";
import Footer from "../../components/layout/Footer";
import styles from "./Mainpage.module.css";

function Mainpage() {
  return (
    <div className={styles.mainContainer}>
      <Header />
      <main className={styles.mainContent}>
        <section className={styles.sectionCard}>
          <Banner />
        </section>
        <section className={styles.sectionCard}>
          <UpcomingEvents />
        </section>
        <section className={styles.sectionCard}>
          <GenreRanking />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Mainpage;
