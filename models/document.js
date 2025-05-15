import mongoose, {Schema} from "mongoose";

const documentSchema = new Schema(
    {
        name: String,
        content: String,
    }
);

const Document = mongoose.models.Document ||  mongoose.model("Document", documentSchema);

export default Document;