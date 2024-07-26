import Image from "next/image";

type BookViewProps = {
    isbn: string;
};

export default async function BookView({ isbn }: BookViewProps) {
    const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );
    const data = await res.json();
    const coverUrl = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;

    const description =
        data.items?.[0]?.volumeInfo?.description || "Not available";

    return (
        <div className="flex gap-8 items-start mx-auto w-2/3">
            <Image
                className="h-auto w-1/4 bg-gray-400"
                alt=""
                src={coverUrl}
                height={100}
                width={100}
            />
            <div className="w-3/4">
                <h1 className="text-xl">Description: </h1>
                <p>{description}</p>
            </div>
        </div>
    );
}
