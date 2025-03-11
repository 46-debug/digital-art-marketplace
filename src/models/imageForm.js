import mongoose from "mongoose";

const ImageFormSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true, // ✅ Cloudinary URL
  },
  publicId: {
    type: String,
    required: true, // ✅ Useful for deletions
  },
  description: {
    type: String,
  },
  hashtags: {
    type: [String],
  },
  amount: {
    type: Number,
    default: 0,
  },
  userId: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  likedBy: {
    type: [String],
  },
  likes: {
    type: Number,
    default: 0,
  },
  savedBy: {
    type: [String],
  },
}, { timestamps: true });

const ImageForm = mongoose.models.image || mongoose.model("image", ImageFormSchema);

export default ImageForm;

