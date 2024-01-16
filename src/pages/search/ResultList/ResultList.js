import React, { useEffect, useState, useReducer } from "react";
import classes from "./ResultList.module.css";
import SearchForm from "../SearchForm/SearchForm";
import MovieDetail from "../../MovieList/MovieDetail";
import useRequest from "../../hooks/useRequest";

const ResultsList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movieDetails, setMovieDetails] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
  const [film, setFilm] = useState("");
  const [movieInfo, setMovieInfo] = useState("");
  const [video, setVideo] = useState("");
  // Sử dụng hook useRequest để gửi yêu cầu tìm kiếm phim
  const { listMovie: listSearchMovie } = useRequest(
    `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=1&api_key=4c691f4e75ba24f557cb2b19d3860611`
  );
  // Xử lý sự kiện khi người dùng chọn một phim từ kết quả tìm kiếm
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
  // Sử dụng useEffect để kiểm tra kết quả tìm kiếm và hiển thị thông báo nếu không có kết quả
  useEffect(() => {
    if (listSearchMovie && listSearchMovie.length > 0) {
      setSearchResult(true);
    } else {
      setSearchResult(false);
    }
  }, [listSearchMovie]);
  console.log(searchResult);
  // Sử dụng useEffect để gửi yêu cầu để lấy video phim khi người dùng chọn một phim
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
  //hàm nhận dữ liệu props từ searchInput
  const handlerSearchValue = (enteredSearch) => {
    setSearchValue(enteredSearch);
  };
  return (
    <>
      <SearchForm searchInput={handlerSearchValue} />
      <div className={classes.search_results}>
        <h2>Search Results</h2>
        {searchResult ? (
          <div className={classes["search-img"]}>
            {listSearchMovie.map((film) => (
              <img
                key={film.id}
                className={classes.imageSearch}
                onClick={() => filmHandler(film.id, film)}
                src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
              />
            ))}
          </div>
        ) : (
          <h2 className={classes.err}>không tìm thấy phim</h2>
        )}

        {/* nếu moveDetail = true  hiển thị trang chi tiết của phim*/}
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
    </>
  );
};
export default ResultsList;
