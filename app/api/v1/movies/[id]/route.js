import { connectDB } from "@/lib/connectDB";
import { sendResponse } from "@/lib/helpers";
import Movie from "@/models/movieModel";

export async function GET(request, response) {
  try {
    await connectDB();
    const { id } = response.params;

    if (!id || id.length < 23) {
      return sendResponse("fail", 400, "Invalid request");
    }

    const movie = await Movie.findById({ _id: response.params.id }).lean();

    return sendResponse("success", 200, "Movie retrieved successfully", movie);
  } catch (err) {
    console.log(err.message);
    return sendResponse("fail", 500, "Internal server error");
  }
}
