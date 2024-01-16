import React from "react";
import Navbar from "../component/navbar";
import Banner from "../component/banner";
import MovieList from "../MovieList/MovieList";
function Browse() {
  return (
    <>
      <Navbar />
      <Banner />
      <MovieList />
    </>
  );
}

export default Browse;
