import { auth } from "@/auth";
import { connectToMongoDb } from "@/lib/db";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await auth();
    await connectToMongoDb();
    if (!session) return;

    const authUserId = session?.user._id as string;

    // get all users except the authenticated user
    const users = await User.find({ _id: { $ne: authUserId } });

    return NextResponse.json(users);
  } catch (error) {
    console.log("Error in getting users");
    throw error;
  }
};
