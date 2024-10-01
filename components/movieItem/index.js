"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
function MoivieItem({ item }) {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState(item?.thumbnail || "");

  useEffect(() => {
    if (imageUrl) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = imageUrl;
      document.head.appendChild(link);
    }
  }, [imageUrl]);

  function handloWatchTV() {
    router.push(`/watch/${item.id}`);
    const fetchData = async () => {
      try {
        const response = await axios.put(`/api/movies/${item.id}`, {
          views: 1,
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:");
      }
    };
    fetchData();
  }
  return (
    <div
      className="bg-gray-700 p-2 rounded cursor-pointer relative"
      onClick={handloWatchTV}
    >
      <div className="absolute text-xs top-2 left-2 text-white flex items-center bg-gray-800 bg-opacity-75 px-2 py-1 rounded">
        <p>{item?.views} views</p>
      </div>
      <Image
        alt="Mountains"
        src={item?.thumbnail}
        width={170}
        height={128}
        className="w-full h-28 object-contain md:h-32 image_s"
        priority
        style={{
          width: '100%',
        }}
      />

      <p className="mt-2 text-white text-sm		line-clamp-1">{item?.title}</p>
    </div>
  );
}

export default MoivieItem;
