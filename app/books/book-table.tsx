"use client";
import { Books } from "@prisma/client";
import BookItem from "./book-item";
import { useState } from "react";
import { isDate } from "node:util";

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
    const [sortTracker, setSortTracker] = useState<SortTracker>({
        title: undefined,
        author: undefined,
        published: undefined,
        isbn: undefined,
    });

    function sortBooks(sortBy: BookIndex) {
        console.log(sortTracker);

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

        if (
            sortTracker[sortBy] === "desc" ||
            sortTracker[sortBy] === undefined
        ) {
            sortTracker[sortBy] = "asc";
        } else {
            sortTracker[sortBy] = "desc";
        }
    }
    return (
        <table className="mx-auto my-10 bg-slate-400 rounded-md">
            <thead>
                <tr>
                    <th
                        className="p-4 hover:underline cursor-pointer"
                        onClick={() => {
                            sortBooks("title");
                        }}
                    >
                        Title
                    </th>
                    <th
                        className="p-4 hover:underline cursor-pointer"
                        onClick={() => {
                            sortBooks("author");
                        }}
                    >
                        Author
                    </th>
                    <th
                        className="p-4 hover:underline cursor-pointer"
                        onClick={() => {
                            sortBooks("published");
                        }}
                    >
                        Published
                    </th>
                    <th
                        className="p-4 hover:underline cursor-pointer"
                        onClick={() => {
                            sortBooks("isbn");
                        }}
                    >
                        ISBN
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedBooks.map((book) => {
                    return (
                        <BookItem
                            key={book.id}
                            {...book}
                            formattedDate={book.published.toLocaleDateString()}
                        ></BookItem>
                    );
                })}
            </tbody>
        </table>
    );
}
