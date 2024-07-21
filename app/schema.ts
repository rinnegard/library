import prisma from "@/lib/prisma";
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

export const AddBookSchema = z.object({
    title: z.string().trim().min(1),
    author: z.string().trim().min(1),
    published: z
        .string()
        .date("Invalid date, please use YYYY-MM-DD format")
        .transform((val) => {
            const date = new Date(val);
            return date;
        }),
    isbn: z
        .string()
        .trim()
        .min(3)
        .refine(async (current) => {
            const count = await prisma.books.count({
                where: {
                    isbn: current,
                },
            });

            return count < 1;
        }, "ISBN is already being used"),
});

export const UpdateSchema = z.object({
    id: z.string().trim().cuid(),
    title: z.string().trim().min(1),
    author: z.string().trim().min(1),
    published: z
        .string()
        .date("Invalid date, please use YYYY-MM-DD format")
        .transform((val) => {
            const date = new Date(val);
            return date;
        }),
    isbn: z
        .string()
        .trim()
        .min(3)
        .refine(async (current) => {
            const count = await prisma.books.count({
                where: {
                    isbn: current,
                },
            });

            return count < 1;
        }, "ISBN is already being used"),
});
