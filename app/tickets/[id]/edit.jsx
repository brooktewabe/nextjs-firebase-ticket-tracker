"use client";
import { useRouter } from "next/navigation";

export default function EditButton({ id }) {
  const router = useRouter();

  const goToEdit = async () => {
    router.push(`/tickets/edit/${id}`);
  };

  return (
    <button
      onClick={goToEdit}
      type="button"
      className="absolute top-10 right-0 m-2 p-1 rounded-full text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    >
      EDIT
    </button>
  );
}
