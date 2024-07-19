import prisma from "@/lib/prisma";
import Main from "../components/main";
import BookItem from "./book-item";

export default async function BooksPage() {
    const books = await prisma.books.findMany();
    return (
        <Main>
            <h1 className="text-3xl text-center">Books</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published</th>
                        <th>ISBN</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => {
                        return <BookItem key={book.id} {...book}></BookItem>;
                    })}
                </tbody>
            </table>
        </Main>
    );
}
