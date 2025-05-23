import React from "react";
import Header from "../../components/layout/Header";
import AdBanner from "../../components/layout/AdBanner";
import Banner from "./components/Banner";
import UpcomingEvents from "./components/UpcomingEvents";
import GenreRanking from "./components/GenreRanking";
import Footer from "../../components/layout/Footer";
import "./Mainpage.css";

function Mainpage() {
  return (
    <div className="mainContainer">
      <Header searchBar />
      <AdBanner />
      <main className="mainContent">
        <Banner />
        <section className="sectionCard">
          <UpcomingEvents />
        </section>
        <section className="sectionCard">
          <GenreRanking />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Mainpage;
