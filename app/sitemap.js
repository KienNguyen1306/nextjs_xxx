// import { fetchcountrys, fetchmoviesData } from "@/lib/fetch";

import connection from "@/lib/db";

export default async function sitemap() {
  let NEXT_BASE_URL ='https://filmsexhd.com'
  const [moviesData] = await connection.execute(`SELECT * FROM movies`);
  let movie = [];
  if (moviesData) {
    movie = moviesData.map((item) => ({
      url: `${NEXT_BASE_URL}/watch/${item.id}`,
      lastModified: item.created_date,
      changeFrequency: "yearly",
      priority: 1,
    }));
  }

  const [results] = await connection.execute(`SELECT * FROM caterogys`);
  let caterogys = [];
  if (caterogys) {
    caterogys = results.map((item) => ({
      url: `${NEXT_BASE_URL}/movie/${item.id}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    }));
  }

  const routes = ["/"].map((route) => ({
    url: `${NEXT_BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  }));

  return [...routes,...movie,...caterogys];

}


// DB_DATABASE	filmtgzj_movies	

// DB_HOST	127.0.0.1	

// DB_PASSWORD	Az142685@	

// DB_USER	filmtgzj_user	

// NEXTAUTH_SECRET	4zG5+kpNHQ7LgVpO3vNnWkFHkKN2tY+7MP9LXthjZ5Q=	

// NEXTAUTH_URL	https://filmsexhd.com/api/auth	

// NEXT_BASE_URL	https://filmsexhd.com	

// SECRET_KEY	4zG5+kpNHQ7LgVpO3vNnWkFHkKN2tY+7MP9LXthjZ5Q=