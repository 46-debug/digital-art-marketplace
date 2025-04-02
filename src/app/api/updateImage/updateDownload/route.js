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

        const hasDownloaded = image.downloadBy.includes(userId);

        if (hasDownloaded) {
            // User already download
            image.downloads += 1;
        } else {
            // User not download
            image.downloadBy.push(userId);
            image.downloads += 1;
        }

        await image.save();

        return new Response(JSON.stringify(image), { status: 200 });
    } catch (error) {
        console.error("Error updating like:", error);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
