"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteBookAction(id: string) {
    "use server";
    const result = await prisma.books.delete({
        where: {
            id: id,
        },
    });

    console.log(result);

    revalidatePath("/books");
}
