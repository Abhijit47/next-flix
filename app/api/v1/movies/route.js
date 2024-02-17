import { connectDB } from "@/lib/connectDB";
import { sendResponse } from "@/lib/helpers";
import Movie from "@/models/movieModel";

export async function GET(request, response) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // Extract the current page number
    const currentPage = Number(searchParams.get("page")) || 1;

    // Extract limit
    const limitPerPage = Number(searchParams.get("limit")) || 12;

    // console.log(currentPage); // 1
    // console.log(limitPerPage); // 10

    // Calculate the number of items to skip
    const skipRecord = (currentPage - 1) * limitPerPage;

    const movies = await Movie.find({})
      .sort({ lastupdated: -1 })
      .skip(skipRecord)
      .limit(limitPerPage)
      .lean();

    const currentResult = movies.length;
    const totalRecords = await Movie.find({}).lean().count();
    const totalPage = Math.ceil(totalRecords / limitPerPage);

    return sendResponse(
      200,
      "success",
      movies,
      currentPage,
      currentResult,
      totalPage,
      totalRecords,
    );
  } catch (err) {
    return sendResponse(500, "Internal server error");
  }
}
