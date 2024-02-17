import { connectDB } from "@/lib/connectDB";
import { sendResponse } from "@/lib/helpers";
import Comment from "@/models/commentModel";
import Movie from "@/models/movieModel";
import { sendError, sendStatusCode } from "next/dist/server/api-utils";

export async function GET(req, res) {
  try {
    const { id } = res.params;

    if (!id) {
      return sendResponse(404, "No comment found on this id");
    }

    await connectDB();

    const comment = await Comment.findById({ _id: id }).lean();

    const movie = await Movie.findById({ _id: comment.movie_id }).lean();

    return new Response(
      JSON.stringify(
        {
          status: 200,
          message: "success",
          comment: comment,
          movie: movie,
        },
        "",
        2,
      ),
    );
  } catch (err) {
    return sendResponse(500, err.message);
  }
}
