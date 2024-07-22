import prisma from "@/lib/prisma";
import Main from "../components/main";
import BookTable from "./book-table";

export default async function BooksPage() {
    const books = await prisma.books.findMany();

    return (
        <Main>
            <h1 className="text-3xl text-center">Books</h1>
            <BookTable books={books}></BookTable>
        </Main>
    );
}
