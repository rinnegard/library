"use client";
import { Books } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { ButtonHTMLAttributes, useState } from "react";
import { updateBookAction } from "../actions";

type BookItemProps = Books & { formattedDate: string };

export default function BookDetails({
    id,
    title,
    author,
    published,
    isbn,
    formattedDate,
}: BookItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    const [titleEdit, setTitleEdit] = useState(title);
    const [authorEdit, setAuthorEdit] = useState(author);
    const [formattedDateEdit, setFormattedDateEdit] = useState(formattedDate);
    const [isbnEdit, setIsbnEdit] = useState(isbn);

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setIsEditing(!isEditing);
    }

    function handleCancel() {
        if (!isEditing) {
            router.back();
        } else {
            setIsEditing(!isEditing);
            setTitleEdit(title);
            setAuthorEdit(author);
            setFormattedDateEdit(formattedDate);
            setIsbnEdit(isbn);
        }
    }

    return (
        <form
            action={(formData: FormData) => {
                setIsEditing(!isEditing);
                updateBookAction(formData);
            }}
            className="flex flex-col px-2"
        >
            <input type="hidden" id="id" name="id" value={id}></input>
            <label htmlFor="title" className="pt-4">
                Title
            </label>
            <input
                type="text"
                name="title"
                id="title"
                className={
                    "border border-lime-300 " +
                    (!isEditing ? "bg-gray-400" : "")
                }
                value={titleEdit}
                onChange={(e) => {
                    setTitleEdit(e.target.value);
                }}
                readOnly={!isEditing}
            />
            <label htmlFor="author " className="pt-4">
                Author
            </label>
            <input
                type="text"
                name="author"
                id="author"
                className={
                    "border border-lime-300 " +
                    (!isEditing ? "bg-gray-400" : "")
                }
                value={authorEdit}
                onChange={(e) => {
                    setAuthorEdit(e.target.value);
                }}
                readOnly={!isEditing}
            />
            <label htmlFor="published" className="pt-4">
                Published
            </label>
            <input
                type="text"
                name="published"
                id="published"
                className={
                    "border border-lime-300 " +
                    (!isEditing ? "bg-gray-400" : "")
                }
                value={formattedDateEdit}
                onChange={(e) => {
                    setFormattedDateEdit(e.target.value);
                }}
                readOnly={!isEditing}
            />
            <label htmlFor="isbn" className="pt-4">
                ISBN
            </label>
            <input
                type="text"
                name="isbn"
                id="isbn"
                className={
                    "border border-lime-300 " +
                    (!isEditing ? "bg-gray-400" : "")
                }
                value={isbnEdit}
                onChange={(e) => {
                    setIsbnEdit(e.target.value);
                }}
                readOnly={!isEditing}
            />
            <div className="flex justify-evenly">
                <button
                    onClick={handleCancel}
                    type="button"
                    className="mt-4 bg-red-500 h-10 w-1/4 self-center hover:bg-red-400 active:bg-red-600"
                >
                    {isEditing ? "Cancel" : "Back"}
                </button>
                {isEditing ? (
                    <button
                        type="submit"
                        className="mt-4 bg-lime-300 h-10 w-1/4 self-center hover:bg-lime-400 active:bg-lime-500"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="mt-4 bg-lime-300 h-10 w-1/4 self-center hover:bg-lime-400 active:bg-lime-500"
                    >
                        Edit
                    </button>
                )}
            </div>
        </form>
    );
}
