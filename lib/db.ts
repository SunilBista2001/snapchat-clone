import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null;

export const connectToMongoDb = async () => {
  if (cachedConnection) {
    console.log(`MongoDB connected Succesfully`);
    return cachedConnection;
  }
  try {
    const con = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB connected: ${con.connection.host}`);
    cachedConnection = con.connection;
  } catch (error) {
    console.error(`Error in connecting mongo database`);
  }
};
