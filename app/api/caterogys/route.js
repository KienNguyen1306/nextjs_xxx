import connection from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export async function GET(request) {
  try {
    const [results] = await connection.execute(`SELECT * FROM caterogys`);
    return NextResponse.json({ results }, { status: 200 });
  } catch (err) {
    return NextResponse.error("Error message", 500);
  }
}
