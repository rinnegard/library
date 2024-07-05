type MainProps = {
    children?: React.ReactNode;
};

export default function Main({ children }: MainProps) {
    return (
        <main className="container shadow-lg flex-grow flex-shrink-0 basis-auto p-3 max-w-screen-lg mx-auto">
            {children}
        </main>
    );
}
