import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { isDate } from "util/types";

export default async function createBookAction(formData: FormData) {
    "use server";
    const data = Object.fromEntries(formData);

    const title = data.title.valueOf();
    const author = data.author.valueOf();
    const isbn = data.isbn.valueOf();

    const publishedString = data.published.valueOf();
    let published: Date | undefined;
    if (typeof publishedString === "string") {
        published = new Date(publishedString);
    }
    if (
        typeof title === "string" &&
        typeof author === "string" &&
        isDate(published) &&
        typeof isbn === "string"
    ) {
        await prisma.books.create({
            data: {
                title: title,
                author: author,
                published: published,
                isbn: isbn,
            },
        });
    }

    console.log(data);

    redirect("/books");
}

export async function deleteBookAction(id: string) {
    "use server";
    console.log(id);
}
