import React, { Fragment, useEffect, useState } from "react";
import classes from "./banner.module.css";
import useRequest from "../hooks/useRequest";
const Banner = () => {
  const [backdropData, setBackdropData] = useState("");
  const [nameData, setNameData] = useState("");
  const [overviewData, setOverviewData] = useState("");
  const API_KEY = "4c691f4e75ba24f557cb2b19d3860611";

  //lấy dữ liệu từ dataNetflixOriginal
  const { listMovie: dataNetflix } = useRequest(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_network=123`
  );

  useEffect(() => {
    //kiểm tra dataNetflix có dữ liệu không và random ra thông tin và ảnh phim cho banner
    if (dataNetflix && dataNetflix.length > 0) {
      const randomIndex = Math.floor(Math.random() * dataNetflix.length - 1);
      const randomMovie = dataNetflix[randomIndex];
      const randomBackdrop = randomMovie.backdrop_path;
      const randomName = randomMovie.name;
      const randomOverView = randomMovie.overview;
      setBackdropData(randomBackdrop);
      setOverviewData(randomOverView);
      setNameData(randomName);
    }
  }, [dataNetflix]);

  return (
    <Fragment>
      <img
        className={classes.imgBackdrop}
        src={`https://image.tmdb.org/t/p/original/${backdropData}`}
      />
      <div className={classes["form-info"]}>
        <h1>{nameData}</h1>
        <div className={classes["group-btn"]}>
          <button className={classes[`btn`]}>Play</button>
          <button className={classes[`btn`]}>My List</button>
        </div>
        <p>{overviewData}</p>
      </div>
    </Fragment>
  );
};
export default Banner;
