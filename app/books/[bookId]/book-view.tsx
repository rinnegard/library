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
    console.log(coverUrl);

    const description = data.items?.[0]?.volumeInfo?.description;

    return (
        <div className="flex gap-8 mx-auto w-2/3">
            <Image
                className=""
                alt=""
                src={coverUrl}
                height={200}
                width={200}
            />
            <div>
                <h1 className="text-xl">Description: </h1>
                <p>{description}</p>
            </div>
        </div>
    );
}
