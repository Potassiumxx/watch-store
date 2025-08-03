package com.watchstore.server.exceptions;

import org.springframework.http.HttpStatus;

import com.watchstore.server.dto.response.FieldErrorResponse;

public class AuthAPIException extends RuntimeException {
  private FieldErrorResponse fieldErrorResponse;
  private HttpStatus status;

  public AuthAPIException(String message) {
    super(message);
  }

  public AuthAPIException(FieldErrorResponse fieldErrorResponse) {
    super("Unauthorised access");
    this.fieldErrorResponse = fieldErrorResponse;
  }

  public AuthAPIException(FieldErrorResponse fieldErrorResponse, HttpStatus status) {
    super(status.getReasonPhrase());
    this.fieldErrorResponse = fieldErrorResponse;
    this.status = status;
  }

  public FieldErrorResponse getErrorResponse() {
    return fieldErrorResponse;
  }

  public HttpStatus getStatus() {
    return status;
  }
}
