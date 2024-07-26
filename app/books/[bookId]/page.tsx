import Main from "@/app/components/main";
import { getBookAction } from "../actions";
import { notFound } from "next/navigation";
import BookDetailsEdit from "./book-details-edit";
import BookView from "./book-view";
import { Metadata } from "next";

export type BookDetailsPageProps = {
    params: {
        bookId: string;
    };
};

export const metadata: Metadata = {
    title: "Book Details",
};

export default async function BookDetailsPage({
    params,
}: BookDetailsPageProps) {
    const book = await getBookAction(params.bookId);

    if (!book) {
        notFound();
    }

    return (
        <Main>
            <h1 className="text-3xl text-center">Book Details</h1>
            <BookView isbn={book.isbn}></BookView>
            <BookDetailsEdit
                {...book}
                formattedDate={book.published.toLocaleDateString("sv")}
            ></BookDetailsEdit>
        </Main>
    );
}
