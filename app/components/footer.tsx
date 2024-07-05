export default function Footer() {
    return (
        <footer className="bg-lime-300 flex justify-center gap-6 p-3">
            <div className="flex flex-row justify-center gap-6 p-3 flex-shrink-0 max-w-screen-2xl">
                <div className="flex-1 text-center">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequatur, consectetur. Architecto ipsum, accusantium
                        quibusdam totam, nemo rem adipisci excepturi aliquam
                        consectetur dolorum asperiores, eum sequi voluptatem
                        dicta dolore ullam non.
                    </p>
                </div>
                <div className="flex-1 text-center">
                    <ul>
                        <li>Library 1</li>
                        <li>Library 2</li>
                        <li>Library 3</li>
                        <li>Library 4</li>
                        <li>Library 5</li>
                    </ul>
                </div>
                <div className="flex-1 text-center">
                    <p>&copy; LibraryAB 2024</p>
                </div>
            </div>
        </footer>
    );
}
