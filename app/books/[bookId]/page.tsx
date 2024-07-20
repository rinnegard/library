import Main from "@/app/components/main";
import { getBookAction } from "../actions";
import { notFound } from "next/navigation";
import BookDetails from "./book-details";

export type BookDetailsPageProps = {
    params: {
        bookId: string;
    };
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
            <BookDetails
                {...book}
                formattedDate={book.published.toLocaleDateString()}
            ></BookDetails>
        </Main>
    );
}
