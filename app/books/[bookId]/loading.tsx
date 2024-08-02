import Main from "@/app/components/main";

export default function Loading() {
    return (
        <Main>
            <h1 className="text-3xl text-center">Book Details</h1>
            <div className="flex gap-8 mx-auto w-full">
                <div className="h-96 w-1/4 bg-gray-400 relative"></div>

                <div className="w-3/4">
                    <h1 className="text-xl">Description: </h1>
                    <p className="bg-gray-400 w-11/12 h-7 rounded-xl mb-2"></p>
                    <p className="bg-gray-400 w-5/6 h-7 rounded-xl mb-2"></p>
                    <p className="bg-gray-400 w-full h-7 rounded-xl mb-2"></p>
                    <p className="bg-gray-400 w-3/4 h-7 rounded-xl mb-2"></p>
                </div>
            </div>
        </Main>
    );
}
