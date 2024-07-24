"use client";
import { Books } from "@prisma/client";
import BookItem from "./book-item";
import { ReactNode, useCallback, useEffect, useState } from "react";
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
    [key: string]: SortOrder;
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
    const sortBooksCallback = useCallback(sortBooks, [sortTracker]);

    useEffect(() => {
        setSortedBooks(books);
    }, [books]);

    useEffect(() => {
        sortBooksCallback();
    }, [sortBooksCallback]);

    function sortBooks() {
        console.log("Sorting");

        let sortBy: BookIndex;
        let order: SortOrder;

        for (const key in sortTracker) {
            if (sortTracker[key] !== undefined) {
                sortBy = key as BookIndex;
                order = sortTracker[key];
            }
        }

        setSortedBooks((currentSortedBooks) => {
            return [...currentSortedBooks].sort((a, b) => {
                let first;
                let second;
                if (order === "asc") {
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
                //Required for typescript should never be reached
                return 0;
            });
        });
    }

    function reverseSortOrder(sortBy: BookIndex) {
        console.log("Reversing sort order");

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
        return (
            <span className="inline-block text-center w-1">
                {sortTracker[index] === "desc"
                    ? "↓"
                    : sortTracker[index] === "asc"
                    ? "↑"
                    : ""}
            </span>
        );
    }

    return (
        <div>
            <form
                className="flex justify-center"
                action={async () => {
                    setSortedBooks(await searchBookAction(searchParam));
                    sortBooks();
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

            <table className="mx-auto my-2 bg-slate-400 rounded-md w-11/12">
                <thead>
                    <tr>
                        <th
                            className="p-4 hover:underline cursor-pointer"
                            onClick={() => {
                                reverseSortOrder("title");
                            }}
                        >
                            Title{showSortArrow("title")}
                        </th>
                        <th
                            className="p-4 hover:underline cursor-pointer"
                            onClick={() => {
                                reverseSortOrder("author");
                            }}
                        >
                            Author{showSortArrow("author")}
                        </th>
                        <th
                            className="p-4 hover:underline cursor-pointer text-nowrap"
                            onClick={() => {
                                reverseSortOrder("published");
                            }}
                        >
                            Published{showSortArrow("published")}
                        </th>
                        <th
                            className="p-4 hover:underline cursor-pointer"
                            onClick={() => {
                                reverseSortOrder("isbn");
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
        </div>
    );
}
