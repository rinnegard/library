import Main from "./components/main";
import Image from "next/image";

export default function Home() {
    return (
        <Main>
            <h1 className="text-3xl text-center mb-8">
                Welcome to the library!
            </h1>

            <Image
                className="mx-auto w-full"
                src="/library.jpg"
                alt=""
                width="700"
                height="700"
                quality={80}
            />
        </Main>
    );
}
