"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type AddBookSuccess = {
    success: true;
};

export type AddBookFail = {
    success: false;
    errors: Zod.ZodFormattedError<
        {
            title: string;
            author: string;
            published: string;
            isbn: string;
        },
        string
    >;
};

export type AddBookResult = AddBookFail | AddBookSuccess;

const AddBookSchema = z.object({
    title: z.string().trim().min(1),
    author: z.string().trim().min(1),
    published: z
        .string()
        .date("Invalid date, please use YYYY-MM-DD format")
        .transform((val) => {
            const date = new Date(val);
            return date;
        }),
    isbn: z.string().trim().min(3),
});

export default async function createBookAction(
    formData: FormData
): Promise<AddBookResult> {
    "use server";
    const data = Object.fromEntries(formData);

    const parseResult = await AddBookSchema.safeParseAsync(data);

    if (parseResult.success) {
        await prisma.books.create({
            data: parseResult.data,
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
