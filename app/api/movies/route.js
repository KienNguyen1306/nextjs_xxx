import connection from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  // const allowedOrigins = 'https://filmsexhd.com';
  // const origin = request.nextUrl.origin;
  // const isAllowed = origin.includes(allowedOrigins);
  // if (!isAllowed) {
  //   return NextResponse.json({ message: allowedOrigins }, { status: 403 });
  // }

  const searchParams = request.nextUrl.searchParams;
  try {
    const page = parseInt(searchParams.get("page")) || 1;
    const perPage = parseInt(searchParams.get("limit")) || 40;
    const offset = (page - 1) * perPage;
    const [countResults] = await connection.execute(
      "SELECT COUNT(*) as totalCount FROM `movies`"
    );

    const totalCount = countResults[0].totalCount;
    const totalPages = Math.ceil(totalCount / perPage);
    const [results] = await connection.execute(
      `SELECT movies.*, caterogys.title AS category
       FROM movies
       JOIN caterogys ON movies.caterogy_id = caterogys.id
       WHERE movies.active = 1
       ORDER BY movies.id DESC
       LIMIT ${offset}, ${perPage}`
    );
    return NextResponse.json(
      { movies: results, totalPages, totalCount, perPage },
      { status: 200 }
    );
  } catch (err) {
    console.log(err)
    return NextResponse.error("Error message", 500);
  }
}
