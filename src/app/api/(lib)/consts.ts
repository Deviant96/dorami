export const API_RESPONSE_MESSAGES = {
  SUCCESS: {
    FETCH_SUCCESS: "Data fetched successfully.",
    CREATE_SUCCESS: "Resource created successfully.",
    UPDATE_SUCCESS: "Resource updated successfully.",
    DELETE_SUCCESS: "Resource deleted successfully.",
    AUTH_SUCCESS: "Authentication successful.",
  },
  ERROR: {
    BAD_REQUEST:
      "The request could not be understood or was missing required parameters.",
    UNAUTHORIZED:
      "Authentication failed or user does not have permissions for the requested operation.",
    FORBIDDEN: "Access denied.",
    NOT_FOUND: "Resource not found.",
    METHOD_NOT_ALLOWED:
      "Requested method is not allowed for the specified resource.",
    CONFLICT: "Request could not be processed because of conflict.",
    SERVER_ERROR: "Internal server error.",
    SERVICE_UNAVAILABLE:
      "Service is currently unavailable. Please try again later.",
    VALIDATION_ERROR: "One or more fields have validation errors.",
    TIMEOUT: "The request timed out. Please try again.",
  },
};
