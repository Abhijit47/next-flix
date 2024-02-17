import mongoose from "mongoose";

const DB = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD,
);

// Variable to track the connection status
let isConnected = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (!DB) {
    return console.log(
      "Please define the DATABASE_URL environment variable inside .env.local",
    );
  }

  if (isConnected) return console.log("=> using existing database connection.");

  try {
    await mongoose.connect(DB);

    isConnected = true;

    console.log("MongoDB Connected");
  } catch (error) {
    console.log({ err: error, msg: "Error connecting to MongoDB" });
  }
};

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export default async function connectDB() {
//   if (cached.conn) {
//     console.log("Cached connection 🔗");
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const options = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(db, options).then((mongoose) => {
//       return mongoose;
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default async function connectDB() {
//   try {
//     mongoose
//       .connect(db, {
//         // useNewUrlParser: true,
//         // useUnifiedTopology: true,
//         // useCreateIndex: true,
//         // useFindAndModify: false,
//       })
//       .then(() => {
//         console.log("Connected to DB");
//       })
//       .catch((err) => {
//         console.log("Something wrong in connectiong to DB", err.message);
//       });
//   } catch (err) {
//     console.log("Something went very wrong", err.message);
//   }
// }
