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

export const POST = async (req) => {
    try {
        // 🛠️ Get form data
        const formData = await req.formData();
        const image = formData.get("image");

        if (!image) {
            return NextResponse.json({ success: false, message: "No image uploaded" }, { status: 400 });
        }

        // 🛠️ Convert Blob to Buffer
        const buffer = Buffer.from(await image.arrayBuffer());

        // 🛠️ Upload image to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload_stream(
                {
                    folder: "uploads", // ✅ Save in the "uploads" folder
                    resource_type: "image",
                },
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }
            ).end(buffer);
        });

        // ✅ Extract other form fields
        const description = formData.get("description") || "";
        const hashtags = formData.get("hashtags") || "[]";
        const amount = Number(formData.get("amount")) || 0;
        const userId = formData.get("userId") || "";
        const userImage = formData.get("userImage") || "";
        const userName = formData.get("userName") || "";


        // ✅ Save to MongoDB
        const newImageForm = new ImageForm({
            imageUrl: uploadResult.secure_url, // ✅ Save Cloudinary URL
            publicId: uploadResult.public_id,  // ✅ Useful for deletions
            description,
            hashtags,
            amount,
            userId,
            userImage,
            userName,
        });

        await newImageForm.save();

        return NextResponse.json({ success: true, message: "Image uploaded successfully", imageUrl: uploadResult.secure_url }, { status: 200 });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ success: false, message: "Image upload failed" }, { status: 500 });
    }
};
