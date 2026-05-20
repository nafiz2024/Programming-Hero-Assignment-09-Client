const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;
const CLIENT_URI = process.env.CLIENT_URI || "http://localhost:3000";

app.use(
  cors({
    origin: CLIENT_URI,
    credentials: true,
  })
);
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const JWKS = createRemoteJWKSet(new URL(`${CLIENT_URI}/api/auth/jwks`));

const verifyToken = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { payload } = await jwtVerify(token, JWKS);
    req.user = payload; // optional: future ownership checks
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
};

async function run() {
  try {
    // await client.connect(); 

    const db = client.db("drivenfleet");
    const carCollection = db.collection("cars");
    const bookingCollection = db.collection("bookings");

    app.post("/car", verifyToken, async (req, res) => {
      const carData = req.body;
      const result = await carCollection.insertOne(carData);
      res.json(result);
    });

    app.get("/car", async (req, res) => {
      const result = await carCollection.find().toArray();
      res.json(result);
    });

    app.get("/car/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid car id" });
      }

      const result = await carCollection.findOne({ _id: new ObjectId(id) });
      res.json(result);
    });

    app.patch("/car/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid car id" });
      }

      const updateData = req.body;
      const result = await carCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

      res.json(result);
    });

    app.delete("/car/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid car id" });
      }

      const result = await carCollection.deleteOne({ _id: new ObjectId(id) });
      res.json(result);
    }); 

    app.post("/booking", verifyToken, async (req, res) => {
      const bookingData = req.body;
      const result = await bookingCollection.insertOne(bookingData);
      res.json(result);
    });

    app.get("/booking", verifyToken, async (req, res) => {
      const result = await bookingCollection.find().toArray();
      res.json(result);
    });

    app.delete("/booking/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid booking id" });
      }

      const result = await bookingCollection.deleteOne({ _id: new ObjectId(id) });
      res.json(result);
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Server error:", error);
  }
}

run();

app.get("/", (req, res) => {
  res.send("Server is running fine!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});