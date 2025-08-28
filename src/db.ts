import mongoose, {model, Schema} from "mongoose";
import dotenv from "dotenv";


dotenv.config();
const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("MONGO_URI is not defined in .env");
}

mongoose.connect(uri)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.error("MongoDB Error:", err));

const UserSchema = new Schema({
     username: {type: String, unique: true},
     password: String,
})

export const UserModel = model("User",  UserSchema);

const ContentSchema = new Schema({
     title: String,
     link: String,
     tags: [{type: mongoose.Types.ObjectId, ref:'Tag'}],
     userId: [{type: mongoose.Types.ObjectId, ref:'user', required: true}]
})

export const ContentModel = model("Content", ContentSchema)