import { useId } from "react";

type FormErrorProps = {
    errors: string[] | undefined;
};

export default function FormError({ errors }: FormErrorProps) {
    const id = useId();

    if (!errors || !errors.length) {
        return (
            <ul>
                <li key={id} className="invisible">
                    Invisible Error Message
                </li>
            </ul>
        );
    }

    return (
        <ul>
            {errors.map((error) => {
                return (
                    <li key={id} className="text-red-600">
                        {error}
                    </li>
                );
            })}
        </ul>
    );
}
