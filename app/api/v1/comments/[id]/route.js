import { connectDB } from "@/lib/connectDB";
import { sendResponse } from "@/lib/helpers";
import Comment from "@/models/commentModel";
import Movie from "@/models/movieModel";

export async function GET(req, res) {
  try {
    const { id } = res.params;

    if (!id || id.length !== 24) {
      return sendResponse("success", 400, "Invalid request");
    }

    await connectDB();

    const comment = await Comment.findById({ _id: id }).lean();

    const movie = await Movie.findById({ _id: comment.movie_id }).lean();

    return sendResponse("success", 200, "Comment retrieved successfully", {
      comment,
      movie,
    });
  } catch (err) {
    console.log(err.message);
    return sendResponse("fail", 500, "Internal server error");
  }
}
