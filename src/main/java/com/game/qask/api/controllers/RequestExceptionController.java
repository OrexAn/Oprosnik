package com.game.qask.api.controllers;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
//@ResponseBody //Может быть полезно
public class RequestExceptionController {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> handleValidationExceptions(
            MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map<String, String> errors = new LinkedHashMap<>();
        String fieldName = "timestamp";
        String errorMessage = LocalDateTime.now().toString();
        errors.put(fieldName, errorMessage);
        fieldName = "status";
        errorMessage = String.format("%d", HttpStatus.BAD_REQUEST.value());
        errors.put(fieldName, errorMessage);
        fieldName = "error";
        errorMessage = HttpStatus.BAD_REQUEST.getReasonPhrase();
        errors.put(fieldName, errorMessage);
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String errorFieldName = "message";
            String errorMessageText = error.getDefaultMessage();
            errors.put(errorFieldName, errorMessageText);
        });
        fieldName = "path";
        errorMessage = request.getRequestURI();
        errors.put(fieldName, errorMessage);
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
