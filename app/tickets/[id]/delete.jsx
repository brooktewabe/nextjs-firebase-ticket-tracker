"use client";
import { useRouter } from "next/navigation";
import { BiTrash } from "react-icons/bi";

export default function DeleteButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tickets/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      console.log(`Deleted ticket with ID ${id}`);
      router.push("/tickets");
    }
  };

  return (
    <button
      onClick={handleDelete}
      type="button"
      className="absolute top-0 right-0 m-2 p-1 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      title="Delete Ticket"
    >
      <BiTrash />
    </button>
  );
}
