"use client"
import Heading from "@/components/heading";
import MoivieItem from "@/components/movieItem";
import Paginations from "@/components/pagination";
import Skeleton from "@/components/Skeleton";
import { getMoviesBySearch } from "@/redux/movies/moviesSlice";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Search() {
  const [loading, setLoading] = useState(true);
  const {lists,totalPages} = useSelector((state) => state.movies)
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
 
  const query = searchParams.get('query')
  useEffect(()=>{
    dispatch(getMoviesBySearch({query:query})).then(() => setLoading(false));
  },[dispatch, query])

  function handleNextPage(page){
    dispatch(getMoviesBySearch({query:query,page:page})).then(() => setLoading(false));
  }
  return (
    <>
      <main className="p-4 bg-gray-800">
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500">🔥</span>
          <span className="text-white	">Phim Sex Hay</span>
        </div>
        <div className="bg-slate-900 mt-4 p-4">
          <Heading title={`TÌM KIẾM : ${query}`}/>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {loading ? (
              <Skeleton itemCount={15} />
            ) : (
              lists.map((item) => <MoivieItem key={item.id} item={item} />)
            )}
            
          </div>

          <Paginations pageCount={totalPages} handleNextPage={handleNextPage}/>
        </div>
      </main>
    </>
  );
}
