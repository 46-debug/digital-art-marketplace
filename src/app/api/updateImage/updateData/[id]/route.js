import dbConnection from "@/database/config";
import ImageForm from "@/models/imageForm";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(req, { params }) {
    try {
        await dbConnection(); // Ensure DB connection is established

        const { id } = params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
        }

        const { description, hashtags, amount } = await req.json();

        const updatedImage = await ImageForm.findByIdAndUpdate(
            id,
            { $set: { description, hashtags, amount } },
            { new: true, runValidators: true }
        );

        if (!updatedImage) {
            return NextResponse.json({ success: false, message: "Image not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, image: updatedImage }, { status: 200 });
    } catch (error) {
        console.error("Error updating image:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
