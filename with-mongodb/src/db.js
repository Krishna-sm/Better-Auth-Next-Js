// import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
 
const client = new MongoClient(process.env.MONGO_URI);
export const db = client.db()
 
// export const auth = betterAuth({
//     database: mongodbAdapter(db)
// })