import mongoose, {Schema} from "mongoose";

const documentSchema = new Schema(
    {
        name: String,
        content: Array,
    }
);

const Document = mongoose.models.Document ||  mongoose.model("Document", documentSchema);

export default Document;