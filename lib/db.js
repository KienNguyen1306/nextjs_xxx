import mysql from "mysql2/promise";

let connection;

try {
  connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
  });
} catch (error) {
  console.error("Failed to connect to MySQL:", error);
}

export default connection;
