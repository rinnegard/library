"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const UpdateSchema = z.object({
    id: z.string().trim().cuid(),
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

export async function deleteBookAction(id: string) {
    "use server";
    const result = await prisma.books.delete({
        where: {
            id: id,
        },
    });

    console.log(result);

    revalidatePath("/books");
}

export async function getBookAction(id: string) {
    "use server";
    const result = await prisma.books.findUnique({
        where: {
            id: id,
        },
    });

    return result;
}

export async function updateBookAction(formData: FormData) {
    const data = Object.fromEntries(formData.entries());

    const validatedData = UpdateSchema.safeParseAsync(data);

    console.log(data);
    console.log(data.title);

    if (
        typeof data.id === "string" &&
        typeof data.title === "string" &&
        typeof data.author === "string" &&
        typeof data.published === "string" &&
        typeof data.isbn === "string"
    ) {
        const result = await prisma.books.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
                author: data.author,
                published: new Date(data.published),
                isbn: data.isbn,
            },
        });

        console.log(result);
        revalidatePath("/books");
    }
}
