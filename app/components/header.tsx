import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-lime-300 p-3 flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold">Library</h1>
            <nav>
                <ul>
                    <li>
                        <Link href={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link href={"/books"}>Books</Link>
                    </li>
                    <li>
                        <Link href={"/authors"}>Authors</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
