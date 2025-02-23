import dbConnection from "@/database/config";
import ImageForm from "@/models/imageForm";
import { NextResponse } from "next/server";

dbConnection();

export async function GET() {
    try {
        const images = await ImageForm.find();

        return NextResponse.json({ success: true, images }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Failed to fetch images" }, { status: 500 });
    }
};
