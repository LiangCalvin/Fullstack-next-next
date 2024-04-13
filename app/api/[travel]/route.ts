import { createConnection } from "mysql2/promise"; 
export const dynamic = "force-dynamic"; // defaults to auto

type Params = {
  travel: string
}
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

export async function GET(request: Request, context: { params: Params }) {
  try {
    const id = context.params.travel;
    const connection = await connectToDatabase();
    const [rows, fields] = await connection.execute(
      "SELECT * FROM attractions WHERE `id` = ?", [id]
    );
    await connection.end();
      // Log the results and fields
      console.log('Results:', rows);
      console.log('Fields:', fields);
    return Response.json({ data: rows });
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}