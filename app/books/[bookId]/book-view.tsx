import Image from "next/image";

type BookViewProps = {
    isbn: string;
};

import type { GoogleBooksResponse } from "@/app/googlebooks-types";

export default async function BookView({ isbn }: BookViewProps) {
    const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );
    const data = (await res.json()) as GoogleBooksResponse;
    const coverUrl = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail || "";

    const description =
        data.items?.[0]?.volumeInfo?.description || "Not available";

    return (
        <div className="flex gap-8 mx-auto w-full">
            <div className="h-96 w-1/4 bg-gray-400 relative">
                <Image alt="" src={coverUrl} fill />
            </div>

            <div className="w-3/4">
                <h1 className="text-xl">Description: </h1>
                <p>{description}</p>
            </div>
        </div>
    );
}
