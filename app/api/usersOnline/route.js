import { NextResponse } from 'next/server';
import db from "@/lib/db";
let onlineUsers = new Map();
const ONLINE_USER_TTL = 120 * 1000;
function cleanUpExpiredUsers() {
  const now = Date.now();
  onlineUsers.forEach((expiry, userId) => {
    if (expiry < now) {
      onlineUsers.delete(userId);
    }
  });
}

async function saveMaxOnlineUsersToDB() {
  const today = new Date().toISOString().slice(0, 10);
  const [rows] = await db.query('SELECT max_online_count FROM max_online_users WHERE date = ?', [today]);
  const currentMax = rows.length > 0 ? rows[0].max_online_count : 0;
  if (onlineUsers.size > currentMax) {
    if (rows.length > 0) {
      await db.query('UPDATE max_online_users SET max_online_count = ? WHERE date = ?', [onlineUsers.size, today]);
    } else {
      await db.query('INSERT INTO max_online_users (date, max_online_count) VALUES (?, ?)', [today, onlineUsers.size]);
    }
  }
}

export async function GET(request) {
  try {
    const cookies = request.cookies;
    const ipAddress = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    cleanUpExpiredUsers();
    const isUserOnline = onlineUsers.has(ipAddress);
    if (!isUserOnline) {
      const expiry = Date.now() + ONLINE_USER_TTL; 
      onlineUsers.set(ipAddress, expiry);
      await saveMaxOnlineUsersToDB();
      const response = NextResponse.json({ onlineUsers: onlineUsers.size}, { status: 200 });
      response.cookies.set('isOnline', 'true', { maxAge: 120 }); 
      return response;
    } else {
      return NextResponse.json({ onlineUsers: onlineUsers.size}, { status: 200 });
    }
  } catch (err) {
    return NextResponse.error(new Response("Error occurred while processing your request.", { status: 500 }));
  }
}
