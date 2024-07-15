import { type Books } from "@prisma/client";

export default function BookItem({
    id,
    title,
    author,
    published,
    isbn,
}: Books) {
    return (
        <li key={id} className="p-4">
            Title: {title}
            <ul>
                <li>Author: {author}</li>

                <li>Published: {published.toLocaleDateString()}</li>

                <li>ISBN: {isbn}</li>
            </ul>
        </li>
    );
}
