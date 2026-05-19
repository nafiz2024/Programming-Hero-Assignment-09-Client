import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient("mongodb+srv://drivefleet:F6ltilXDnpqAVzLL@cluster0.j6x9a1p.mongodb.net/?appName=Cluster0");
const db = client.db("drivenfleet");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: {
    enabled: true,
  }
});