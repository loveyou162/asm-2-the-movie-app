import React, { useEffect, useState } from "react";
import classes from "./MovieList.module.css";
import MovieDetail from "./MovieDetail";
function ListRender(props) {
  // Lấy các dữ liệu từ props
  const type = props.data.type;
  console.log(type);
  const title = props.data.title;
  // Sử dụng useState để quản lý trạng thái của component
  const [film, setFilm] = useState("");
  const [movieInfo, setMovieInfo] = useState("");
  const [movieDetails, setMovieDetails] = useState(false);
  const [video, setVideo] = useState("");

  // Hàm xử lý khi người dùng nhấn vào một hình ảnh phim
  const filmHandler = (id, movie) => {
    if (id !== film) {
      setMovieDetails(true);
      setFilm(id);
      setMovieInfo(movie);
    } else {
      //ẩn Moviedetail
      setMovieDetails(false);
      setFilm("");
      setMovieInfo("");
    }
  };
  console.log(movieInfo);
  console.log(film);
  // Sử dụng useEffect để thực hiện việc tải video trailer khi có thay đổi trong biến "film"
  useEffect(() => {
    if (film) {
      const fetchKey = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${film}/videos?api_key=4c691f4e75ba24f557cb2b19d3860611`
          );
          const data = await response.json();
          if (data.results.length > 0) {
            setVideo(
              data.results.filter((mov) => mov.type === "Trailer")[0].key
            );
          } else {
            setVideo("");
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchKey();
    }
    return;
  }, [film]);

  //render các phần tử lên giao diện
  return (
    <div className={classes.Original}>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.imgBox}>
        {props?.data?.data
          ?.filter((film) => film[type] !== null)
          .map((film) => (
            <img
              alt=""
              onClick={() => filmHandler(film.id, film)}
              className={classes.imgOriginal}
              key={film.id.toString()}
              src={`https://image.tmdb.org/t/p/w500/${film[type]}`}
            />
          ))}
      </div>
      {/* Hiển thị chi tiết phim nếu biến "movieDetails" được thiết lập thành true */}
      {movieDetails && (
        <MovieDetail
          name={movieInfo.name ? movieInfo.name : movieInfo.title}
          date={
            movieInfo.release_date
              ? movieInfo.release_date
              : movieInfo.first_air_date
          }
          vote={movieInfo.vote_average}
          overview={
            movieInfo.overview ? (
              movieInfo.overview
            ) : (
              <p>Không có bản tóm tắt cho phim này!</p>
            )
          }
          id={video}
          posterPath={`https://image.tmdb.org/t/p/w500/${movieInfo.backdrop_path}`}
        />
      )}
    </div>
  );
}

export default ListRender;
