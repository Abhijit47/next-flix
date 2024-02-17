import { connectDB } from "@/lib/connectDB";
import { sendResponse } from "@/lib/helpers";
import Movie from "@/models/movieModel";

export async function GET(request, response) {
  try {
    await connectDB();
    const { id } = response.params;

    if (!id) {
      return sendResponse(404, "Movie not found with this id");
    }

    const movie = await Movie.findById({ _id: response.params.id }).lean();

    return sendResponse(200, "success", movie);
  } catch (err) {
    return sendResponse(500, "Internal server error");
  }
}
