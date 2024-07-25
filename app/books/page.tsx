import Main from "../components/main";
import SearchBar from "./search-bar";
import { Suspense } from "react";
import TableSkeleton from "./table-skeleton";
import { Books } from "@prisma/client";
import { searchBookAction, getAllBooksAction } from "./actions";
import BookTable from "./book-table";

type BookPageProps = {
    searchParams: { query?: string };
};

export default async function BooksPage({ searchParams }: BookPageProps) {
    const query = searchParams.query;
    let books: Books[];
    if (query != undefined) {
        books = await searchBookAction(query);
    } else {
        books = await getAllBooksAction();
    }

    return (
        <Main>
            <h1 className="text-3xl text-center mb-8">Books</h1>
            <SearchBar query={query}></SearchBar>
            <Suspense key={query} fallback={TableSkeleton()}>
                <BookTable books={books} />
            </Suspense>
        </Main>
    );
}
