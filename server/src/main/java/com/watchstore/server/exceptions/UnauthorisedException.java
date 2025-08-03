package com.watchstore.server.exceptions;

import com.watchstore.server.dto.response.FieldErrorResponse;

public class UnauthorisedException extends RuntimeException {
  private FieldErrorResponse fieldErrorResponse;

  public UnauthorisedException(String message) {
    super(message);
  }

  public UnauthorisedException(FieldErrorResponse fieldErrorResponse) {
    super("Unauthorised access");
    this.fieldErrorResponse = fieldErrorResponse;
  }

  public FieldErrorResponse getErrorResponse() {
    return fieldErrorResponse;
  }
}
