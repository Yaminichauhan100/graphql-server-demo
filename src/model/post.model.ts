import mongoose, { model } from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});
const postModel = mongoose.model('post', postSchema)
export default postModel