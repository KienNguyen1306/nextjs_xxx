import connection from "@/lib/db";
import { NextResponse } from "next/server";



export async function GET(request, params) {
  try {
    let id = params.params.id;
    const [results] = await connection.execute(
      `SELECT * FROM caterogys  WHERE  id = ${id}`
    );
    return NextResponse.json(results[0]);
  } catch (err) {
    return NextResponse.error("Error message", 500);
  }
}

