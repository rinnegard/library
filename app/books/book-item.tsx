import { type Books } from "@prisma/client";

export default function BookItem({
    id,
    title,
    author,
    published,
    isbn,
}: Books) {
    return (
        <tr key={id} className="p-4">
            <td>{title}</td>
            <td>{author}</td>
            <td>{published.toLocaleDateString()}</td>
            <td>{isbn}</td>
        </tr>
    );
}
