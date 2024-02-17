import mongoose, { Schema } from 'mongoose';

const theaterSchema = new Schema({
  theaterId: {
    type: Number,
  },
});

const Theater =
  mongoose.models.Theater || mongoose.model('Theater', theaterSchema);

export default Theater;
