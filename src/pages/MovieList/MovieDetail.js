import React from "react";
import classes from "./MovieDetail.module.css";
import YouTube from "react-youtube";
const MovieDetail = (props) => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
  //kiểm tra có id không để hiển thị video hoặc hình ảnh
  const hasVideo = props.id;
  //kiểm tra có đường dẫn không để hiển thị thông báo
  const hasPoster = props.posterPath;

  return (
    <div className={classes["movie-detail"]}>
      <div className={classes["movie-info"]}>
        <h1>{props.name}</h1>
        <h5 className={classes["movie-release"]}>Release Date: {props.date}</h5>
        <h5 className={classes["movie-vote"]}>Vote: {props.vote} /10</h5>
        <p>{props.overview}</p>
      </div>
      <div className={classes["trailer-yt"]}>
        {hasVideo ? (
          <YouTube videoId={props.id} opts={opts} />
        ) : hasPoster ? (
          <img src={props.posterPath} alt="" className={classes.poster} />
        ) : (
          <p>Không có ảnh hoặc video.</p>
        )}
      </div>
    </div>
  );
};
export default MovieDetail;
