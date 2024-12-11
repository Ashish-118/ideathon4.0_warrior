class ApiError extends Error {
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = false;
        this.message = message;
        // this.data = NULL;   // commented by me because  it caused at error 


        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError }