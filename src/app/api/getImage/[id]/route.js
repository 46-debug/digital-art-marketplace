import dbConnection from "@/database/config";
import ImageForm from "@/models/imageForm";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
    try {
        await dbConnection(); // Ensure DB connection is established

        const { id } = await params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
        }

        const image = await ImageForm.findById(id);
        if (!image) {
            return NextResponse.json({ success: false, message: "Image or user not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, image }, { status: 200 });
    } catch (error) {
        console.error("Error fetching image:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}

