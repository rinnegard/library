import prisma from "@/lib/prisma";
import Main from "../components/main";

export default async function Books() {
    const books = await prisma.books.findMany();
    return (
        <Main>
            <h1 className="text-3xl text-center">Books</h1>
            <ul>
                {books.map((book) => {
                    return <li key={book.id}>{book.title}</li>;
                })}
            </ul>
        </Main>
    );
}
