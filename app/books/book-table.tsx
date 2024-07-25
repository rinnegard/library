import { Books } from "@prisma/client";
import { getAllBooksAction, searchBookAction } from "./actions";
import BookTableBody from "./book-table-body";

type BookTableProps = {
    query?: string;
};

export default async function BookTable({ query }: BookTableProps) {
    let books: Books[];
    if (query != undefined) {
        books = await searchBookAction(query);
    } else {
        books = await getAllBooksAction();
    }

    return <BookTableBody books={books}></BookTableBody>;
}
