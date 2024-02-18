import { connectDB } from "@/lib/connectDB";
import { sendResponse } from "@/lib/helpers";
import Comment from "@/models/commentModel";

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

    const comments = await Comment.find({})
      .skip(skipRecord)
      .limit(limitPerPage)
      .lean();

    const currentResult = comments.length;
    const totalCommentCount = await Comment.find({}).lean().count();
    const totalPage = Math.ceil(totalCommentCount / limitPerPage);

    return sendResponse(
      "success",
      200,
      "Comments retrived successfully",
      comments,
      currentPage,
      currentResult,
      totalPage,
      totalCommentCount,
    );
  } catch (err) {
    console.log(err.message);
    return sendResponse("fail", 500, "Internal Server error");
  }
}
