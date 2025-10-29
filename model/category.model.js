import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryname: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    }
}, { timeseries: true });

export default mongoose.model("AddCategory", categorySchema);