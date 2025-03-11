import dbConnection from "@/database/config";
import ImageForm from "@/models/imageForm";

export async function PUT(req) {
    try {
        const { id, userId } = await req.json();

        await dbConnection();

        const image = await ImageForm.findById(id);
        if (!image) {
            return new Response(JSON.stringify({ error: "Image not found" }), { status: 404 });
        }

        const hasSaved = image.savedBy.includes(userId);

        if (hasSaved) {
            // User already liked → Remove like
            image.savedBy = image.savedBy.filter((uid) => uid !== userId);
        } else {
            // User not liked → Add like
            image.savedBy.push(userId)
        }

        await image.save();

        return new Response(JSON.stringify(image), { status: 200 });
    } catch (error) {
        console.error("Error updating like:", error);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}