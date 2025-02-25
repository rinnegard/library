"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { AddBookResult, UpdateSchema } from "../schema";

export async function deleteBookAction(id: string) {
    "use server";
    const result = await prisma.books.delete({
        where: {
            id: id,
        },
    });

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

export async function getAllBooksAction() {
    const result = await prisma.books.findMany();

    revalidatePath("/books");

    return result;
}

export async function updateBookAction(
    formData: FormData
): Promise<AddBookResult> {
    const data = Object.fromEntries(formData.entries());

    const parseResult = await UpdateSchema.safeParseAsync(data);

    if (parseResult.success) {
        const result = await prisma.books.update({
            where: {
                id: parseResult.data.id,
            },
            data: {
                title: parseResult.data.title,
                author: parseResult.data.author,
                published: parseResult.data.published,
                isbn: parseResult.data.isbn,
            },
        });

        revalidatePath("/books");
        return {
            success: true,
        };
    } else {
        const formattedErrors = parseResult.error.format();
        return {
            success: false,
            errors: formattedErrors,
        };
    }
}

export async function searchBookAction(searchParam: string) {
    return await prisma.books.findMany({
        where: {
            OR: [
                {
                    title: { contains: searchParam, mode: "insensitive" },
                },
                {
                    author: { contains: searchParam, mode: "insensitive" },
                },
                {
                    isbn: { contains: searchParam, mode: "insensitive" },
                },
            ],
        },
    });
}
