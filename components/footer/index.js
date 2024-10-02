"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

function Footer() {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [usersDaySub, setUsersDaySub] = useState(0);
  const [usersCurDate, setUsersCurDate] = useState(0);



  useEffect(() => {
    const updateUserCounts = async () => {
      try {
        const [onlineResponse, yesterdayResponse, todayResponse] = await Promise.all([
          fetch("/api/usersOnline"),
          fetch("/api/usersOnline/usersdaysub"),
          fetch("/api/usersOnline/usercurday")
        ]);
        if (!onlineResponse.ok || !yesterdayResponse.ok || !todayResponse.ok) {
          throw new Error("Error fetching user data");
        }
        const [onlineData, yesterdayData, todayData] = await Promise.all([
          onlineResponse.json(),
          yesterdayResponse.json(),
          todayResponse.json()
        ]);
        setOnlineUsers(onlineData.onlineUsers);
        setUsersDaySub(yesterdayData.yesterdayOnlineUsers[0]?.max_online_count || 0);
        setUsersCurDate(todayData.todayOnlineUsers[0]?.max_online_count || 0);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    updateUserCounts();
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {/*Footer container*/}
      <footer className="flex flex-col items-center bg-gray-800 text-center text-surface dark:bg-neutral-700 dark:text-white lg:text-left">
        <div className="container p-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="mb-6 md:mb-0">
              <Link
                href="/"
                className="text-2xl font-bold mb-2 font-medium uppercase text-white"
              >
                <span className="text-yellow-400">SEX</span>
                NEW.XYZ
              </Link>
              <p className="mb-4 text-white text-sm		">
                SEXNEW.XYZ là trang web phim sex chỉ dành cho các bạn trên 20
                tuổi, xem phim JAV chỉ để giải trí, giải tỏa nhu cầu sinh lý,
                không bắt chước theo phim, tránh vi phạm pháp luật.
              </p>
            </div>
            <div className="mb-6 md:mb-0 text-center	lg:text-right">
              <h2 className="mb-2 font-medium uppercase text-yellow-400 text-lg	">
                {currentDateTime}
              </h2>
              <p className="mb-4 text-white">👩🏿‍🤝‍👩🏽 Hôm nay : {usersCurDate}</p>
              <p className="mb-4 text-white">👩🏿‍🤝‍👩🏽 Hôm qua : {usersDaySub}</p>
              <p className="mb-4 text-white">
                👩🏿‍🤝‍👩🏽 Người đang online : {onlineUsers}
              </p>
            </div>
          </div>
        </div>
        {/*Copyright section*/}
        <div className="w-full bg-black/5 p-4 text-center text-white">
          © 2023 Copyright:
          <a href="https://sexnew.xyz/">SEXNEW.XYZ</a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
