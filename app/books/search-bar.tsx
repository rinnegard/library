"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function SearchBar() {
    const searchParam = useSearchParams();
    const pathname = usePathname();
    const searchRef = useRef<HTMLInputElement>(null);
    const { replace } = useRouter();

    function addQueryToURL() {
        const params = new URLSearchParams(searchParam);
        const searchValue = searchRef.current?.value || "";

        if (searchValue.trim()) {
            params.set("query", searchValue);
        } else {
            params.set("query", "");
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <form
            className="flex justify-center"
            action={() => {
                addQueryToURL();
            }}
        >
            <input
                autoFocus
                ref={searchRef}
                className="border border-lime-300 rounded-l-md outline-none pl-2"
                type="search"
                defaultValue={searchParam.get("query") || ""}
            />
            <button
                type="submit"
                className="bg-lime-300 border border-lime-300 rounded-r-md"
            >
                Search
            </button>
        </form>
    );
}
