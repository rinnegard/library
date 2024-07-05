import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-lime-300 p-3 flex justify-center">
            <div className="flex flex-row justify-between items-center w-full max-w-screen-xl">
                <h1 className="text-4xl font-bold">Library</h1>
                <nav>
                    <ul>
                        <li>
                            <Link href={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link href={"/books"}>Books</Link>
                        </li>
                        <li>
                            <Link href={"/authors"}>Add New</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
