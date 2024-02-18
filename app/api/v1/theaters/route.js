import { connectDB } from "@/lib/connectDB";
import { sendResponse } from "@/lib/helpers";
import Theater from "@/models/theaterModel";

export const dynamic = "force-dynamic";

export async function GET(request, response) {
  try {
    await connectDB();

    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // Extract the current page number
    const currentPage = Number(searchParams.get("page")) || 1;

    // Extract limit
    const limitPerPage = Number(searchParams.get("limit")) || 10;

    // console.log(currentPage); // 1
    // console.log(limitPerPage); // 10

    // Calculate the number of items to skip
    const skipRecord = (currentPage - 1) * limitPerPage;

    const theaters = await Theater.find({})
      .skip(skipRecord)
      .limit(limitPerPage)
      .lean();

    // Calculate current
    const currentResult = theaters.length;

    // Calculate total records
    const totalRecords = await Theater.find({}).lean().count();

    // Calculate total page
    const totalPage = Math.ceil(totalRecords / limitPerPage);

    return sendResponse(
      "success",
      200,
      "Theaters retrieved successfully",
      theaters,
      currentPage,
      currentResult,
      totalPage,
      totalRecords,
    );
  } catch (err) {
    console.log(err.message);
    return sendResponse("fail", 500, "Internal server error");
  }
}
