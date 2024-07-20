"use client";
import { type Books } from "@prisma/client";
import deleteBookAction from "./actions";

type BookItemProps = Books & { formattedDate: string };

export default function BookItem({
    id,
    title,
    author,
    published,
    isbn,
    formattedDate,
}: BookItemProps) {
    function handleClick() {
        const doDelete = confirm(`Are you sure you want to delete "${title}"`);

        if (doDelete) {
            deleteBookAction(id);
        }
    }

    return (
        <tr key={id} className="odd:bg-slate-200">
            <td className="p-2">{title}</td>
            <td className="p-2">{author}</td>
            <td className="p-2">{formattedDate}</td>
            <td className="p-2">{isbn}</td>
            <td className="p-2">
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
