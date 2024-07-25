"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type SearchBarProps = {
    query?: string;
};

export default function SearchBar({ query }: SearchBarProps) {
    const searchParam = useSearchParams();
    const pathname = usePathname();
    const [searchValue, setSearchValue] = useState(query || "");
    const { replace } = useRouter();

    function addQueryToURL() {
        const params = new URLSearchParams(searchParam);

        if (searchValue.trim()) {
            params.set("query", searchValue);
        } else {
            params.set("query", "");
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    }

    useEffect(() => {
        console.log(query);
    }, [query]);

    return (
        <form
            className="flex justify-center"
            action={() => {
                addQueryToURL();
            }}
        >
            <input
                className="border border-lime-300 rounded-l-md outline-none pl-2"
                type="search"
                name=""
                id=""
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
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
