import localFont from "next/font/local";
import "./globals.css";
import Narbar from "@/components/narbar";
import ProviderRedux from "./ProviderRedux";
import Header from "@/components/header";
import Footer from "@/components/footer";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    default:'Phim sex Việt Nam - Xem Phim Sex Vietsub Phụ Đề Tiếng Việt',
    template:
    "%s - Phim sex Việt Nam - Xem Phim Sex hay - sex việt",
  },
  description: "Phim sex Việt Nam. Gạ em tập chung phòng gym đi nhà nghỉ. Việt Nam · Gạ em tập chung phòng gym đi nhà nghỉ · Hoa Hậu quốc dân kêu oan vì bán rau sạch. Việt Nam.",
};

export default function RootLayout({ children }) {
  return (
    <ProviderRedux>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased p-2 bg-gray-800`}
        >
          <Header/>
          <Narbar />
          {children}
          <Footer/>
        </body>
      </html>
    </ProviderRedux>
  );
}
