// app/api/chat/route.js
import { NextResponse } from "next/server";

let messages = []; // Mảng lưu trữ tin nhắn
const MESSAGE_LIFETIME = 60  * 1000; // 1 giờ tính bằng milliseconds

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        // Kiểm tra và xóa tin nhắn cũ hơn 1 giờ
        const currentTime = Date.now();
        messages = messages.filter((msg) => currentTime - msg.timestamp < MESSAGE_LIFETIME); // Lọc tin nhắn

        return NextResponse.json({ messages }, { status: 200 }); // Trả về cả tên và tin nhắn
    } catch (err) {
        console.error("Error fetching messages:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { name, message } = await request.json(); // Nhận tên và tin nhắn từ yêu cầu
        const timestamp = Date.now(); // Lưu thời gian gửi tin nhắn
        messages.push({ name, text: message, timestamp }); // Lưu tin nhắn và tên vào mảng cùng với timestamp

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("Error saving message:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
