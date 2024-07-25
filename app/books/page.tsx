import Main from "../components/main";
import SearchBar from "./search-bar";
import BookTable from "./book-table";
import { Suspense } from "react";
import TableSkeleton from "./table-skeleton";

type BookPageProps = {
    searchParams: { query?: string };
};

export default async function BooksPage({ searchParams }: BookPageProps) {
    const query = searchParams.query;

    return (
        <Main>
            <h1 className="text-3xl text-center mb-8">Books</h1>
            <SearchBar query={query}></SearchBar>
            <Suspense key={query} fallback={TableSkeleton()}>
                <BookTable query={query}></BookTable>
            </Suspense>
        </Main>
    );
}
