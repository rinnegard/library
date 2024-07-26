"use client";

import { useEffect } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
    const { pending } = useFormStatus();

    useEffect(() => {
        if (pending) {
            document.body.classList.add("cursor-wait");
        } else {
            document.body.classList.remove("cursor-wait");
        }
        return () => document.body.classList.remove("cursor-wait");
    }, [pending]);

    return (
        <button
            type="submit"
            disabled={pending}
            className="mt-4 bg-lime-300 h-10 w-1/2 self-center hover:bg-lime-400 active:bg-lime-500 disabled:bg-gray-400"
        >
            Add Book
        </button>
    );
}
