import React from "react";
import Header from "../../components/layout/Header";
import Banner from "./components/Banner";
import SearchBar from "./components/SearchBar";
import UpcomingEvents from "./components/UpcomingEvents";
import GenreRanking from "./components/GenreRanking";
import Footer from "../../components/layout/Footer";
import "./Mainpage.css";

function Mainpage() {
  return (
    <div className="mainContainer">
      <Header />
      <main className="mainContent">
        <Banner />
        <SearchBar />
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
