"use client";
import { type Books } from "@prisma/client";
import Link from "next/link";
import { deleteBookAction } from "./actions";

type BookItemProps = Books & {
    formattedDate: string;
};

export default function BookItem({
    id,
    title,
    author,
    published,
    isbn,
    formattedDate,
}: BookItemProps) {
    async function handleClick() {
        const doDelete = confirm(`Are you sure you want to delete "${title}"?`);

        if (doDelete) {
            await deleteBookAction(id);
        }
    }

    return (
        <tr key={id} className="odd:bg-slate-200">
            <td className="border border-black px-4 py-2 break-words">
                <Link
                    href={`/books/${id}`}
                    className="text-blue-600 underline visited:text-purple-600"
                >
                    {title}
                </Link>
            </td>
            <td className="border border-black px-4 py-2 break-words">
                {author}
            </td>
            <td className="border border-black px-4 py-2 break-words">
                {formattedDate}
            </td>
            <td className="border border-black px-4 py-2 break-words">
                {isbn}
            </td>
            <td className="border border-black px-4 py-2 text-center">
                <button
                    onClick={handleClick}
                    type="button"
                    className="bg-red-600 w-5 rounded-full"
                >
                    X
                </button>
            </td>
        </tr>
    );
}
