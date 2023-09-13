class ClientError extends Error{
    statusCode;
    constructor(message, status = 400) {
        super(message);
        this.statusCode = status;
    }
}
export default ClientError;