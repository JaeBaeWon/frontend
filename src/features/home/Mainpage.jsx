import React from "react";
import Header from "../../components/layout/Header";
import Banner from "./components/Banner";
import UpcomingEvents from "./components/UpcomingEvents";
import GenreRanking from "./components/GenreRanking";
import Footer from "../../components/layout/Footer";
import styles from "./Mainpage.css";

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
