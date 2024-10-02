"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const handleSearch = () => {
    if (query) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };
  return (
    <header className="bg-gray-800 p-2 flex items-center justify-between flex-wrap">
      <Link href='/' className="text-2xl font-bold text-white">
        <span className="text-yellow-400">SEX</span>
        NEW.XYZ
      </Link>
      <div className="flex items-center mt-2 sm:mt-0">
        <input
          className="bg-gray-700 text-white p-2 rounded-l input_search"
          placeholder="Nhập gì đó để tìm kiếm phim..."
          type="text"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-gray-700 text-white p-2 rounded-r search"
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>
      </div>
    </header>
  );
}

export default Header;
