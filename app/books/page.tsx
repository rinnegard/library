import prisma from "@/lib/prisma";
import Main from "../components/main";
import BookTable from "./book-table";
import { searchBookAction } from "./actions";
import { Books } from "@prisma/client";

type BookPageProps = {
    searchParams: { [key: string]: string | undefined };
};

export default async function BooksPage({ searchParams }: BookPageProps) {
    const query = searchParams["query"];
    let books: Books[];
    if (query != null) {
        books = await searchBookAction(query);
    } else {
        books = await prisma.books.findMany();
    }

    return (
        <Main>
            <h1 className="text-3xl text-center">Books</h1>

            <BookTable books={books}></BookTable>
        </Main>
    );
}
