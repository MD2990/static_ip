import mongoose from "mongoose";

const DB = process.env.MONGODB_URI;

export async function dbConnect() {
  mongoose.set("strictQuery", true);
  if (!DB) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  /**
   * Global is used here to maintain a cached connection across hot reloads
   * in development. This prevents connections growing exponentially
   * during API Route usage.
   */
  let cached = global.mongoose;

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      family: 4,
    };

    cached.promise = mongoose.connect(DB, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export function jsonify(obj) {
  return JSON.parse(JSON.stringify(obj));
}
