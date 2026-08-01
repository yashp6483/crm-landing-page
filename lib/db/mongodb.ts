import mongoose from "mongoose";
import { ensureDatabaseSeeded } from "@/lib/db/seedHelper";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/orbit360_crm";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2000,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then(async (m) => {
      console.log("Connected to MongoDB database successfully.");
      await ensureDatabaseSeeded();
      return m;
    }).catch((err) => {
      console.warn("MongoDB connection fallback state:", err.message);
      return mongoose;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}
