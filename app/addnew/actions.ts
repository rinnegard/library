import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

const AddBookSchema = z.object({
    title: z.string().trim().min(1),
    author: z.string().trim().min(1),
    published: z
        .string()
        .date()
        .transform((val) => {
            const date = new Date(val);
            return date;
        }),
    isbn: z.string().trim().min(3),
});

export default async function createBookAction(formData: FormData) {
    "use server";
    const data = Object.fromEntries(formData);

    const parseResult = await AddBookSchema.safeParseAsync(data);

    console.log(parseResult.error?.issues);

    if (parseResult.success) {
        await prisma.books.create({
            data: parseResult.data,
        });
        redirect("/books");
    } else {
        // return parseResult.error;
    }
}
