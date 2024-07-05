type MainProps = {
    children?: React.ReactNode;
};

export default function Main({ children }: MainProps) {
    return (
        <main className="flex-grow flex-shrink-0 basis-auto p-3">
            {children}
        </main>
    );
}
