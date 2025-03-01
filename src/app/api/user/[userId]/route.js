import dbConnection from "@/database/config";
import ImageForm from "@/models/imageForm";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        await dbConnection(); // Ensure DB connection is established

        const { userId } = params; // Assuming you're passing userId in the URL

        if (!userId) {
            return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
        }

        const images = await ImageForm.find({ userId: userId.toString() });
        if (!images.length) {
            return NextResponse.json({ success: false, message: "No images found for this user" }, { status: 404 });
        }

        return NextResponse.json({ success: true, images }, { status: 200 });
    } catch (error) {
        console.error("Error fetching images:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
