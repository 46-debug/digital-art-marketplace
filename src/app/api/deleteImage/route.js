import dbConnection from '@/database/config';
import ImageForm from '@/models/imageForm';
import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

// ✅ Connect to MongoDB
dbConnection();

// ✅ Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const DELETE = async (req) => {
    try {
        // 🛠️ Parse request body
        const { imageId } = await req.json();

        if (!imageId) {
            return NextResponse.json({ success: false, message: "Image ID is required" }, { status: 400 });
        }

        // 🛠️ Find image in database
        const imageRecord = await ImageForm.findById(imageId);
        if (!imageRecord) {
            return NextResponse.json({ success: false, message: "Image not found" }, { status: 404 });
        }

        // 🛠️ Delete image from Cloudinary
        await cloudinary.v2.uploader.destroy(imageRecord.publicId);

        // 🛠️ Delete image record from MongoDB
        await ImageForm.findByIdAndDelete(imageId);

        return NextResponse.json({ success: true, message: "Image deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ success: false, message: "Image deletion failed" }, { status: 500 });
    }
};
