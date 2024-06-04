export class RequestError extends Error {
    public readonly status: number;

    public constructor(status: number, message?: string) {
        super(message);
        this.status = status;
    }
}
