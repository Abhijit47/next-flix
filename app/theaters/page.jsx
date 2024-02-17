import Paginate from "@/components/Paginate";
import TheaterContainer from "@/components/TheaterContainer";

async function getTheaters(page) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/v1/theaters?page=${page ?? 1}&limit=12`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch theaters");
    }

    return await res.json();
  } catch (err) {
    throw new Error("Something went wrong");
  }
}

export default async function TheatersPage({ searchParams }) {
  const { data, currentPage, currentResult, totalPage, totalRecord } =
    await getTheaters(searchParams.page);

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <TheaterContainer data={data} />

        <Paginate
          currentPage={currentPage}
          currentResult={currentResult}
          totalPage={totalPage}
          totalRecord={totalRecord}
        />
      </div>
    </section>
  );
}
