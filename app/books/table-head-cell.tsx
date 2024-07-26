type TableHeadCellProps = {
    children?: React.ReactNode;
    className?: string;
    onClick?: (sortBy: BookIndex) => void;
};

type BookIndex = "title" | "author" | "published" | "isbn";

export default function TableHeadCell({
    children,
    onClick,
    className,
}: TableHeadCellProps) {
    return (
        <th
            className={`border border-black text-left p-4 hover:underline cursor-pointer text-nowrap ${className}`}
            onClick={() => {
                if (onClick) {
                    onClick("title");
                }
            }}
        >
            {children}
        </th>
    );
}
