"use client";

import Image from "next/image";

type BookViewProps = {
    isbn: string;
};

import type { GoogleBooksResponse } from "@/app/googlebooks-types";
import { useEffect, useState } from "react";

export default function BookView({ isbn }: BookViewProps) {
    const [coverURL, setCoverURL] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        async function getData() {
            const res = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
            );
            const data = (await res.json()) as GoogleBooksResponse;
            setCoverURL(
                data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail || ""
            );

            setDescription(
                data.items?.[0]?.volumeInfo?.description || "Not available"
            );
        }
        getData();
    }, [isbn]);

    return (
        <div className="flex gap-8 mx-auto w-full">
            <div className="h-96 w-1/4 bg-gray-400 relative">
                {coverURL && <Image alt="" src={coverURL} fill />}
            </div>

            <div className="w-3/4">
                <h1 className="text-xl">Description: </h1>
                <p>{description}</p>
            </div>
        </div>
    );
}
