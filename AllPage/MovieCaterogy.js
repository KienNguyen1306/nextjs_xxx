"use client";
import Heading from "@/components/heading";
import MoivieItem from "@/components/movieItem";
import Paginations from "@/components/pagination";
import Skeleton from "@/components/Skeleton";
import { getMoviesByCaterogy } from "@/redux/movies/moviesSlice";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function MovieCaterogy() {
  const [loading, setLoading] = useState(true);
  const [heading, setHeading] = useState("");

  const { lists, totalPages } = useSelector((state) => state.movies);
  const cate = useSelector((state) => state.caterogys.lists);

  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(getMoviesByCaterogy({ type: params.caterogy })).then(() =>
      setLoading(false)
    );
  }, [dispatch, params.caterogy]);

  function handleNextPage(page) {
    dispatch(getMoviesByCaterogy({ type: params.caterogy, page: page })).then(
      () => setLoading(false)
    );
  }

  useEffect(() => {
    setHeading(cate?.find((item) => item.id == params.caterogy)?.title || "");
  }, [cate, params.caterogy]);
  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      <main className="p-4 bg-gray-800">
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500">🔥</span>
          <span className="text-white	">Phim Sex Hay</span>
        </div>
        <div className="bg-slate-900 mt-4 p-4">
          <Heading title={`PHIM SEX ${heading}`} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {loading ? (
              <Skeleton itemCount={15} />
            ) : (
              lists.map((item) => <MoivieItem key={item.id} item={item} />)
            )}
          </div>

          <Paginations pageCount={totalPages} handleNextPage={handleNextPage} />
        </div>
      </main>
    </>
  );
}
