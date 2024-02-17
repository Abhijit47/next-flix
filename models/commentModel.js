import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
  name: {
    type: String,
  },
});

const Comment =
  mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;
