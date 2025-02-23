import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("connected from Database")
    } catch (error) {
        console.log("Error while connection with database", error.massage);
    }
};

export default dbConnection;