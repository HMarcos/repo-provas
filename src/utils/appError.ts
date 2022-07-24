class AppError extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = this.message;

        Object.setPrototypeOf(this, AppError.prototype);
    };
};

export default AppError;