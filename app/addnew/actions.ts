"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { AddBookResult, AddBookSchema } from "../schema";

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
