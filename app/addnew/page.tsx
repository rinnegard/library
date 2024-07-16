import Main from "../components/main";
import createBookAction from "./actions";

export default function AddNewPage() {
    return (
        <Main>
            <h1 className="text-3xl text-center">Add New Book</h1>
            <form action={createBookAction} className="flex flex-col px-2">
                <label htmlFor="title" className="pt-4">
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="border border-lime-300"
                />
                <label htmlFor="author" className="pt-4">
                    Author
                </label>
                <input
                    type="text"
                    name="author"
                    id="author"
                    className="border border-lime-300"
                />
                <label htmlFor="published" className="pt-4">
                    Published
                </label>
                <input
                    type="text"
                    name="published"
                    id="published"
                    className="border border-lime-300"
                />
                <label htmlFor="isbn" className="pt-4">
                    ISBN
                </label>
                <input
                    type="text"
                    name="isbn"
                    id="isbn"
                    className="border border-lime-300"
                />
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
