"use client";
import { getCaterogy } from "@/redux/caterogy/caterogySlice";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SkeletonNar from "./SkeletonNar";

function Narbar() {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const type = params.caterogy;
  const caterogys = useSelector((state) => state.caterogys.lists);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCaterogy()).then(() => setLoading(false));
  }, [dispatch]);

  return (
    <nav className="bg-gray-800 p-2 flex flex-wrap space-x-4">
      {loading ? (
        <SkeletonNar itemCount ={7}/>
      ) : (
        <>
          <Link
            className={`${
              type === undefined ? "bg-red-600" : ""
            } p-2 rounded text-white cursor-pointer`}
            href="/"
          >
            Trang chủ
          </Link>
          {caterogys.map((item, index) => {
            return (
              <Link
                key={index}
                className={`${
                  type == item.id ? "bg-red-600 rounded" : ""
                } p-2  text-white cursor-pointer`}
                href={`/movie/${item?.id}`}
              >
                {item?.title}
              </Link>
            );
          })}
        </>
      )}
    </nav>
  );
}

export default Narbar;
