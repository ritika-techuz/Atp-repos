export const StatusCodes = {
    SUCCESS: 200, // OK
    CREATED: 201, // Resource created
    ACCEPTED: 202, // Request accepted, processing later
    NO_CONTENT: 204, // Success, no response body

    BAD_REQUEST: 400, // Invalid client request
    UNAUTHORIZED: 401, // Authentication required
    FORBIDDEN: 403, // Authenticated but access denied
    NOT_FOUND: 404, // Resource not found
    CONFLICT: 409, // Resource already exists / conflict
    UNSUPPORTED_MEDIA_TYPE: 415, // Unsupported media type
    UNPROCESSABLE_ENTITY: 422, // Validation failed

    INTERNAL_SERVER_ERROR: 500, // Server error
    NOT_IMPLEMENTED: 501, // API not implemented
    SERVICE_UNAVAILABLE: 503 // Server temporarily unavailable
} as const;
