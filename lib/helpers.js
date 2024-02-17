export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function sendResponse(
  statusCode,
  message,
  data,
  currentPage,
  currentResult,
  totalPage,
  totalRecord,
) {
  return new Response(
    JSON.stringify(
      {
        status: statusCode,
        message: message,
        data: data,
        currentPage: currentPage,
        currentResult: currentResult,
        totalPage: totalPage,
        totalRecord: totalRecord,
      },
      "",
      2,
    ),
  );
}

export function calcMovieRuntime(runtime = 0) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
}

export function customDate(date = Date) {
  const newDate = date ?? new Date();

  return new Date(newDate).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "2-digit",
    // dateStyle: "short",
  });
}

export function calcDateTime(date) {
  const localDateTime = date ?? new Date();

  return new Date(localDateTime).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const array = [15, 16, 17, 18, 19];

function reducer(accumulator, currentValue, index) {
  const returns = accumulator + currentValue;
  console.log(
    `accumulator: ${accumulator}, currentValue: ${currentValue}, index: ${index}, returns: ${returns}`,
  );
  return returns;
}

// array.reduce(reducer);

export function lowerCase(str = "") {
  return str.toLowerCase();
}

export function upperCase(str = "") {
  return str.toUpperCase();
}

export function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
