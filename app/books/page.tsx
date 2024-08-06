import Main from "../components/main";
import SearchBar from "./search-bar";
import { Books } from "@prisma/client";
import { searchBookAction, getAllBooksAction } from "./actions";
import BookTable from "./book-table";
import { Metadata } from "next";

type BookPageProps = {
    searchParams: { query?: string };
};

export const metadata: Metadata = {
    title: "Books",
};

export default async function BooksPage({ searchParams }: BookPageProps) {
    const query = searchParams.query || "";
    const books: Books[] = query
        ? await searchBookAction(query)
        : await getAllBooksAction();

    return (
        <Main>
            <h1 className="text-3xl text-center mb-8">Books</h1>
            <SearchBar></SearchBar>
            <BookTable books={books} />
        </Main>
    );
}
