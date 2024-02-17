import mongoose, { Schema } from 'mongoose';

const movieSchema = new Schema({
  name: {
    type: String,
  },
});

// const Movie = mongoose.models.movies || mongoose.model('Movie', movieSchema);
const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);

export default Movie;
