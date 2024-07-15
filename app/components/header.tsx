"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const currentPath = usePathname();
    return (
        <header className="bg-lime-300 p-3 flex justify-center">
            <div className="flex flex-row justify-between items-center w-full max-w-screen-xl">
                <h1 className="text-4xl font-bold">Library</h1>
                <nav>
                    <ul>
                        <li>
                            <Link
                                href={"/"}
                                className={
                                    "hover:text-gray-700 " +
                                    (currentPath === "/" ? "underline" : "")
                                }
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={"/books"}
                                className={
                                    "hover:text-gray-700 " +
                                    (currentPath === "/books"
                                        ? "underline"
                                        : "")
                                }
                            >
                                Books
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={"/authors"}
                                className={
                                    "hover:text-gray-700 " +
                                    (currentPath === "/authors"
                                        ? "underline"
                                        : "")
                                }
                            >
                                Add New
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
