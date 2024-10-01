import connection from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request,params) {
  // const allowedOrigins = process.env.NEXT_BASE_URL;
  // const origin = request.nextUrl.origin;
  // const isAllowed = origin.includes(allowedOrigins);
  // if (!isAllowed) {
  //   return NextResponse.json({ message: allowedOrigins }, { status: 403 });
  // }
  const searchParams = request.nextUrl.searchParams;
  try {
    const page = parseInt(searchParams.get("page")) || 1;
    const perPage = parseInt(searchParams.get("limit")) || 40; // Số mục trên mỗi trang
    const offset = (page - 1) * perPage;

    // Lấy giá trị `caterogy_id` từ searchParams
    const caterogyId = params.params.id;

    // Truy vấn để lấy tổng số mục có điều kiện caterogy_id
    const countQuery = `
      SELECT COUNT(*) as totalCount
      FROM movies
      WHERE active = 1 ${caterogyId ? `AND caterogy_id = ?` : ""}
    `;
    const [countResults] = await connection.execute(countQuery, [caterogyId]);
    const totalCount = countResults[0].totalCount;
    const totalPages = Math.ceil(totalCount / perPage);
    
    // Truy vấn dữ liệu
    const query = `
      SELECT movies.*, caterogys.title AS category
      FROM movies
      JOIN caterogys ON movies.caterogy_id = caterogys.id
      WHERE movies.active = 1 ${caterogyId ? `AND movies.caterogy_id = ?` : ""}
      ORDER BY movies.id DESC
      LIMIT ?, ?
    `;
    const [results] = await connection.execute(query, [caterogyId, offset, perPage]);

    return NextResponse.json(
      { movies: results, totalPages, totalCount, perPage },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.error("Error message", 500);
  }
}
