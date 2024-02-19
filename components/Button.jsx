export default function Button({ children }) {
  return (
    <button className="rounded-md bg-blue-800 px-4 py-2 text-sm text-white">
      {children}
    </button>
  );
}
