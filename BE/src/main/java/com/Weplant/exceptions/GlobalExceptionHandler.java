package com.Weplant.exceptions;

import com.Weplant.dtos.responses.ApiResponse;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<ApiResponse<String>> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.internalServerError().body(
                ApiResponse.<String>builder()
                        .code(500)
                        .message(e.getMessage())
                        .build()
        );
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse<String>> handleAppException(AppException e) {
        return ResponseEntity.badRequest().body(
                ApiResponse.<String>builder()
                        .code(e.getErrorCode().getCode())
                        .message(e.getErrorCode().getMessage())
                        .build()
        );
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse<String>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        String enumKey = e.getFieldError().getDefaultMessage();
        ErrorCode errorCode = ErrorCode.valueOf(enumKey);
        return ResponseEntity.status(errorCode.getStatusCode()).body(
                ApiResponse.<String>builder()
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }

    @ExceptionHandler(value = ConstraintViolationException.class)
    ResponseEntity<ApiResponse<String>> handleConstraintViolationException(ConstraintViolationException e) {
        return ResponseEntity.badRequest().body(
                ApiResponse.<String>builder()
                        .code(400)
                        .message(e.getMessage())
                        .build()
        );
    }

    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiResponse<String>> handleGenericException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ApiResponse.<String>builder()
                        .code(500)
                        .message("Error from server: " + e.getMessage())
                        .build()
        );
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<ApiResponse<String>> handleAccessDeniedException(AccessDeniedException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                ApiResponse.<String>builder()
                        .code(403)
                        .message("Access Denied: " + e.getMessage())
                        .build()
        );
    }
}
