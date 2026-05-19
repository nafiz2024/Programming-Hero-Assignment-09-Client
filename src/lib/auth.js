import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();

const db = client.db("drivenfleet");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  baseURL: process.env.BETTER_AUTH_URL?.trim(),
  secret: process.env.BETTER_AUTH_SECRET?.trim(),
  advanced: {
    cookiePrefix: "drivefleet-auth",
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }
  }
});
