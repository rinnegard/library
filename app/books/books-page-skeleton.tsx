import Main from "../components/main";

export default function TableSkeleton() {
    return (
        <Main>
            <h1 className="text-3xl text-center mb-8">Books</h1>
            <form className="flex justify-center">
                <input
                    className="border border-lime-300 rounded-l-md outline-none pl-2"
                    type="search"
                    name=""
                    id=""
                />
                <button
                    type="submit"
                    className="bg-lime-300 border border-lime-300 rounded-r-md"
                >
                    Search
                </button>
            </form>
            <table className="border-collapse mx-auto my-2 bg-slate-400 border border-black w-11/12 table-fixed">
                <thead>
                    <tr>
                        <th className="border border-black text-left p-4 hover:underline cursor-pointer text-nowrap">
                            Title
                        </th>
                        <th className="border border-black text-left p-4 hover:underline cursor-pointer text-nowrap">
                            Author
                        </th>
                        <th className="border border-black text-left p-4 hover:underline cursor-pointer text-nowrap">
                            Published
                        </th>
                        <th className="border border-black text-left p-4 hover:underline cursor-pointer text-nowrap">
                            ISBN
                        </th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </Main>
    );
}
