"use client";
import { useState } from "react";
import FormError from "../components/form-error";
import Main from "../components/main";
import createBookAction from "./actions";
import { redirect } from "next/navigation";
import { AddBookFail } from "../schema";

export default function AddNewPage() {
    const [errors, setErrors] = useState<AddBookFail["errors"] | undefined>(
        undefined
    );

    async function action(formData: FormData) {
        const result = await createBookAction(formData);

        if (result.success) {
            console.log(result);
            setErrors(undefined);
            redirect("/books");
        }

        setErrors(result.errors);
    }

    return (
        <Main>
            <h1 className="text-3xl text-center">Add New Book</h1>
            <form action={action} className="flex flex-col px-2">
                <label htmlFor="title" className="pt-4">
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="border border-lime-300"
                />
                <FormError errors={errors?.title?._errors}></FormError>
                <label htmlFor="author" className="pt-4">
                    Author
                </label>
                <input
                    type="text"
                    name="author"
                    id="author"
                    className="border border-lime-300"
                />
                <FormError errors={errors?.author?._errors}></FormError>
                <label htmlFor="published" className="pt-4">
                    Published
                </label>
                <input
                    type="text"
                    name="published"
                    id="published"
                    className="border border-lime-300"
                />
                <FormError errors={errors?.published?._errors}></FormError>
                <label htmlFor="isbn" className="pt-4">
                    ISBN
                </label>
                <input
                    type="text"
                    name="isbn"
                    id="isbn"
                    className="border border-lime-300"
                />
                <FormError errors={errors?.isbn?._errors}></FormError>
                <button
                    type="submit"
                    className="mt-4 bg-lime-300 h-10 w-1/2 self-center hover:bg-lime-400 active:bg-lime-500"
                >
                    Add Book
                </button>
            </form>
        </Main>
    );
}
