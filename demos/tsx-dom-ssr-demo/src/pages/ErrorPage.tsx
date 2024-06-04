import { RequestError } from "../errors/RequestError";
import { DefaultLayout } from "../layouts/DefaultLayout";

interface ErrorPageProps {
    error: unknown;
}

export function ErrorPage({ error }: ErrorPageProps) {
    let title = "Something went wrong";
    let message = String(error);
    if (error instanceof RequestError) {
        if (error.status === 404) {
            title = "File not Found";
            message = "Didn't find what you're looking for";
        }
    }

    return (
        <DefaultLayout title={title}>
            <div>{message}</div>
        </DefaultLayout>
    );
}
