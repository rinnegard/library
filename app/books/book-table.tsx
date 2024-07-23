"use client";
import { Books } from "@prisma/client";
import BookItem from "./book-item";
import { ReactNode, useEffect, useState } from "react";
import { searchBookAction } from "./actions";

type BookTableProps = {
    books: Books[];
};

type BookIndex = "title" | "author" | "published" | "isbn";
type SortOrder = "asc" | "desc" | undefined;
type SortTracker = {
    title: SortOrder;
    author: SortOrder;
    published: SortOrder;
    isbn: SortOrder;
};

export default function BookTable({ books }: BookTableProps) {
    const [sortedBooks, setSortedBooks] = useState(books);
    const [searchParam, setSearchParam] = useState("");
    const [sortTracker, setSortTracker] = useState<SortTracker>({
        title: undefined,
        author: undefined,
        published: undefined,
        isbn: undefined,
    });

    useEffect(() => {
        setSortedBooks(books);
    }, [books]);

    function sortBooks(sortBy: BookIndex) {
        setSortedBooks(
            [...sortedBooks].sort((a, b) => {
                let first;
                let second;
                if (
                    sortTracker[sortBy] === "desc" ||
                    sortTracker[sortBy] === undefined
                ) {
                    first = a[sortBy];
                    second = b[sortBy];
                } else {
                    first = b[sortBy];
                    second = a[sortBy];
                }

                if (typeof first === "string" && typeof second === "string") {
                    return Number(first.localeCompare(second));
                } else if (first instanceof Date && second instanceof Date) {
                    if (first > second) {
                        return 1;
                    } else if (first < second) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
                console.log("Never reached, typescript error?");
                return 0;
            })
        );

        const newTracker: SortTracker = {
            title: undefined,
            author: undefined,
            published: undefined,
            isbn: undefined,
        };

        if (
            sortTracker[sortBy] === "desc" ||
            sortTracker[sortBy] === undefined
        ) {
            sortTracker[sortBy] = "asc";
            newTracker[sortBy] = "asc";
            setSortTracker(newTracker);
        } else {
            newTracker[sortBy] = "desc";
            setSortTracker(newTracker);
            sortTracker[sortBy] = "desc";
        }
    }

    function showSortArrow(index: BookIndex): ReactNode {
        switch (sortTracker[index]) {
            case "desc":
                return <> &darr;</>;
            case "asc":
                return <> &uarr;</>;
            default:
                return "";
        }
    }

    return (
        <div>
            <form
                className="flex justify-center"
                action={async () => {
                    setSortedBooks(await searchBookAction(searchParam));
                }}
            >
                <input
                    className="border border-lime-300 rounded-l-md outline-none pl-2"
                    type="search"
                    name=""
                    id=""
                    value={searchParam}
                    onChange={(e) => {
                        setSearchParam(e.target.value);
                    }}
                />
                <button
                    type="submit"
                    className="bg-lime-300 border border-lime-300 rounded-r-md"
                >
                    Search
                </button>
            </form>

            <table className="mx-auto my-2 bg-slate-400 rounded-md">
                <thead>
                    <tr>
                        <th
                            className="p-4 hover:underline cursor-pointer"
                            onClick={() => {
                                sortBooks("title");
                            }}
                        >
                            Title{showSortArrow("title")}
                        </th>
                        <th
                            className="p-4 hover:underline cursor-pointer"
                            onClick={() => {
                                sortBooks("author");
                            }}
                        >
                            Author{showSortArrow("author")}
                        </th>
                        <th
                            className="p-4 hover:underline cursor-pointer text-nowrap"
                            onClick={() => {
                                sortBooks("published");
                            }}
                        >
                            Published{showSortArrow("published")}
                        </th>
                        <th
                            className="p-4 hover:underline cursor-pointer"
                            onClick={() => {
                                sortBooks("isbn");
                            }}
                        >
                            ISBN{showSortArrow("isbn")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedBooks.map((book) => {
                        return (
                            <BookItem
                                key={book.id}
                                {...book}
                                formattedDate={book.published.toLocaleDateString(
                                    "sv"
                                )}
                            ></BookItem>
                        );
                    })}
                </tbody>
            </table>
            <code>{JSON.stringify(books)}</code>
        </div>
    );
}
