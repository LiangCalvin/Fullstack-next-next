import { createConnection } from "mysql2/promise";
export const dynamic = "force-dynamic"; // defaults to auto

async function connectToDatabase() {
  try {
    const connection = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
    });
    return connection;
  } catch (e) {
    console.error("Error connecting to the database:", e);
    throw e;
  }
}

export async function GET(request: Request) {
  try {
    const connection = await connectToDatabase();
    const [rows, fields] = await connection.execute(
      "SELECT * FROM attractions"
    );
    await connection.end();
    // Log the results and fields
    console.log("Results:", rows);
    console.log("Fields:", fields);
    return Response.json({ data: rows });
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// export async function POST() {
//   const res = await fetch("https://data.mongodb-api.com/...", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "API-Key": process.env.DATA_API_KEY!,
//     },
//     body: JSON.stringify({ time: new Date().toISOString() }),
//   });

//   const data = await res.json();

//   return Response.json(data);
// }
