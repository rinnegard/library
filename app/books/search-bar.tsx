"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SearchBar() {
    const searchParam = useSearchParams();
    const pathname = usePathname();
    const searchRef = useRef<HTMLInputElement>(null);
    const { push } = useRouter();

    const searchDefault = searchParam.get("query")?.toString();

    useEffect(() => {
        if (searchRef.current != null) {
            searchRef.current.value = searchParam.get("query") || "";
        }
    }, [searchParam]);

    function addQueryToURL() {
        const params = new URLSearchParams(searchParam);
        const searchValue = searchRef.current?.value || "";

        if (searchValue.trim()) {
            params.set("query", searchValue);
        } else {
            params.set("query", "");
            params.delete("query");
        }
        push(`${pathname}?${params.toString()}`);
    }

    return (
        <form
            className="flex justify-center"
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                addQueryToURL();
            }}
        >
            <input
                autoFocus
                ref={searchRef}
                className="border border-lime-300 rounded-l-md outline-none pl-2"
                type="search"
                defaultValue={searchDefault}
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
