"use client";
import { Books } from "@prisma/client";
import BookItem from "./book-item";
import { useState } from "react";
import { isDate } from "node:util";

type BookTableProps = {
    books: Books[];
};

type BookIndex = "id" | "title" | "author" | "published" | "isbn";

export default function BookTable({ books }: BookTableProps) {
    const [sortedBooks, setSortedBooks] = useState(books);
    function sortBooks(sortBy: BookIndex) {
        console.log(sortedBooks);

        setSortedBooks(
            [...sortedBooks].sort((a, b) => {
                if (
                    typeof a[sortBy] === "string" &&
                    typeof b[sortBy] === "string"
                ) {
                    console.log("sorting strings");

                    return Number(a[sortBy].localeCompare(b[sortBy]));
                } else if (
                    a[sortBy] instanceof Date &&
                    b[sortBy] instanceof Date
                ) {
                    if (a[sortBy] > b[sortBy]) {
                        return 1;
                    } else if (a[sortBy] < b[sortBy]) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
                console.log("Never reached??");
                return 0;
            })
        );
        console.log(sortedBooks);
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
