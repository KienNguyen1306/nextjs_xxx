import { NextResponse } from 'next/server';
import db from "@/lib/db";

export const dynamic = 'force-dynamic';

async function getTodayOnlineUsers() {
    const [rows] = await db.query(
      // Truy vấn để lấy dữ liệu của hôm nay
      'SELECT * FROM max_online_users WHERE date = CURDATE()'
    );
    return rows; 
}

export async function GET(request) {
    try {
      // Lấy dữ liệu của ngày hôm nay
      const todayData = await getTodayOnlineUsers();
      return NextResponse.json({ todayOnlineUsers: todayData }, { status: 200 });
    } catch (err) {
      return NextResponse.error(new Response("Error occurred while processing your request.", { status: 500 }));
    }
}
