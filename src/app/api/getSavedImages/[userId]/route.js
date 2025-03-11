import { NextResponse } from "next/server";
import dbConnection from "@/database/config";
import ImageForm from "@/models/imageForm";

export async function GET(req, { params }) {
  try {
    await dbConnection();

    const { userId } = params; // Get userId from dynamic route

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
    }

    // Fetch images where userId exists in savedBy array
    const images = await ImageForm.find({ savedBy: userId });

    return NextResponse.json({ success: true, images }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

