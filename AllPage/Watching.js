"use client";

import Heading from "@/components/heading";
import MoivieItem from "@/components/movieItem";
import Skeleton from "@/components/Skeleton";
import {
  getMoviesByCaterogy,
  getMoviesDetail,
} from "@/redux/movies/moviesSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function Watching() {
  const [loading, setLoading] = useState(true);
  const movieDetail = useSelector((state) => state.movies.movieDetail);
  const movieRelat = useSelector((state) => state.movies.lists);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(getMoviesDetail({ id: params.id })).then(() => {
      dispatch(getMoviesByCaterogy({ type: movieDetail.caterogy_id })).then(
        () => setLoading(false)
      );
    });
  }, [dispatch, movieDetail.caterogy_id, params.id]);

  return (
    <div className=" mx-auto p-1 sm:p-4 bg-gray-800">
      <h1 className="text-white mb-4">{movieDetail?.title}</h1>

      <div className="responsive-iframe w-full sm:w-4/5 mx-auto	">
        <iframe src={movieDetail?.video} allowFullScreen />
      </div>
      <p className="mt-4 text-white">{movieDetail?.description}</p>

      <div className="mt-4 flex flex-col justify-center items-center ">
        <p className="font-bold text-white">
          Thể loại:{" "}
          <span className="font-normal text-white">
            {movieDetail?.category}
          </span>
        </p>
        <img
          className="object-contain h-32 sm:h-52	rounded"
          src={movieDetail?.thumbnail}
          alt=""
        />
      </div>
      <div className="bg-slate-900 mt-4 p-4">
        <Heading title="phim sex liên quan" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {loading ? (
            <Skeleton itemCount={15} />
          ) : (
            movieRelat.map((item) => <MoivieItem key={item.id} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default Watching;
