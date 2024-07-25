export default function TableSkeleton() {
    return (
        <table className="mx-auto my-2 bg-slate-400 rounded-md w-11/12">
            <thead>
                <tr>
                    <th className="p-4 hover:underline cursor-pointer">
                        Title
                    </th>
                    <th className="p-4 hover:underline cursor-pointer">
                        Author
                    </th>
                    <th className="p-4 hover:underline cursor-pointer text-nowrap">
                        Published
                    </th>
                    <th className="p-4 hover:underline cursor-pointer">ISBN</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    );
}
