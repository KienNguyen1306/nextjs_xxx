import { NextResponse } from 'next/server';
import db from "@/lib/db";

export const dynamic = 'force-dynamic';

async function getYesterdayOnlineUsers() {
    const [rows] = await db.query(
      'SELECT * FROM max_online_users WHERE date = DATE_SUB(CURDATE(), INTERVAL 1 DAY)'
    );
    
    return rows; 
  }
  
  export async function GET(request) {
    try {
      // Lấy dữ liệu của ngày hôm qua
      const yesterdayData = await getYesterdayOnlineUsers();
      return NextResponse.json({ yesterdayOnlineUsers: yesterdayData }, { status: 200 });
    } catch (err) {
      return NextResponse.error(new Response("Error occurred while processing your request.", { status: 500 }));
    }
  }