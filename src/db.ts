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
      username: { type: String, unique: true, required: true },
      password: { type: String, required: true, select: false }
})

export const UserModel = model("User",  UserSchema);

const ContentSchema = new Schema({
     title: String,
     link: String,
     tags: [{type: mongoose.Schema.Types.ObjectId, ref:'Tag'}],
     userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true}
})

export const ContentModel = model("Content", ContentSchema)

const LinkSchema = new Schema({
      hash: String,
      userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true, unique:true}
})

export const LinkModel = model("Share", LinkSchema)