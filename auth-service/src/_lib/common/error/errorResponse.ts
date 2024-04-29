export default class ErrorResponse extends Error {
    public status: number;
    public message: string;
   
    constructor(status: number, message: string) {
     super(message);
     this.status = status;
     this.message = message;
    }
   
    static badRequest(msg: string): ErrorResponse {
     return new ErrorResponse(400, msg || "Bad Request");
    }
   
    static unauthorized(msg: string): ErrorResponse {
     return new ErrorResponse(401, msg || "Unauthorized");
    }
   
    static forbidden(msg: string): ErrorResponse {
     return new ErrorResponse(403, msg || "Forbidden");
    }
   
    static notFound(msg: string): ErrorResponse {
     return new ErrorResponse(404, msg || "Not Found");
    }
    static conflict(msg: string): ErrorResponse {
     return new ErrorResponse(409, msg || "Conflict");
    }
   
    static internalError(msg: string): ErrorResponse {
     return new ErrorResponse(500, msg || "internal Server Error");
    }
   }