export class HttpException extends Error {
    public status: number;
    public message: string;
    public publicMessage?: string;

    constructor (status: number, message: string, publicMessage?: string) {
        super(message);
        this.status = status;
        this.message = message;
        this.publicMessage = publicMessage;
    }
}
