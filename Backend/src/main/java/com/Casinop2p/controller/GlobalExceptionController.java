package com.Casinop2p.controller;

import com.Casinop2p.dto.ErrorDtoRes;
import com.Casinop2p.exceptions.DuplicatedException;
import com.Casinop2p.exceptions.NotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class GlobalExceptionController {

  ZoneId zoneId = ZoneId.of("America/Buenos_Aires");
  LocalDateTime timestamp = LocalDateTime.now(zoneId);

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ErrorDtoRes> handleNotFoundException(NotFoundException exception,
      HttpServletRequest request) {

    int httpStatus = HttpStatus.NOT_FOUND.value();
    ErrorDtoRes response = new ErrorDtoRes(
        httpStatus,
        request.getMethod(),
        "Elemento no econtrado",
        exception.getMessage(),
        timestamp,
        null
    );

    return ResponseEntity.status(httpStatus).body(response);
  }

  @ExceptionHandler(DuplicatedException.class)
  public ResponseEntity<ErrorDtoRes> handleDuplicatedException(DuplicatedException exception,
      HttpServletRequest request) {

    int httpStatus = HttpStatus.CONFLICT.value();
    ErrorDtoRes response = new ErrorDtoRes(
        httpStatus,
        request.getMethod(),
        "Elemento duplicado",
        exception.getMessage(),
        timestamp,
        null
    );

    return ResponseEntity.status(httpStatus).body(response);
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ErrorDtoRes> handleIllegalArgumentException(
      IllegalArgumentException exception, HttpServletRequest request) {

    int httpStatus = HttpStatus.BAD_REQUEST.value();
    ErrorDtoRes apiErrorResponse = new ErrorDtoRes(
        httpStatus,
        request.getMethod(),
        "Elemento con Argumentos invalidos",
        exception.getMessage(),
        timestamp,
        null
    );

    return ResponseEntity.status(httpStatus).body(apiErrorResponse);
  }

  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<ErrorDtoRes> handleHttpMessageNotReadableException(
      HttpMessageNotReadableException exception, HttpServletRequest request) {

    int httpStatus = HttpStatus.BAD_REQUEST.value();
    ErrorDtoRes apiErrorResponse = new ErrorDtoRes(
        httpStatus,
        request.getMethod(),
        "Error en la lectura del HTTP body, Compruebe que el formato es correcto y/o contenga "
            + "data valida.",
        exception.getMessage(),
        timestamp,
        null
    );

    return ResponseEntity.status(httpStatus).body(apiErrorResponse);
  }

  @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
  public ResponseEntity<ErrorDtoRes> handleHttpMediaTypeNotSupportedException(
      HttpMediaTypeNotSupportedException exception,
      HttpServletRequest request) {

    int httpStatus = HttpStatus.UNSUPPORTED_MEDIA_TYPE.value();
    ErrorDtoRes apiErrorResponse = new ErrorDtoRes(
        httpStatus,
        request.getMethod(),
        "Media Type no soportados, los Media Type soportados son: "
            + exception.getSupportedMediaTypes()
            + " y tu enviaste: " + exception.getContentType(),
        exception.getMessage(),
        timestamp,
        null
    );

    return ResponseEntity.status(httpStatus).body(apiErrorResponse);
  }

  @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
  public ResponseEntity<ErrorDtoRes> handleHttpRequestMethodNotSupportedException(
      HttpRequestMethodNotSupportedException exception,
      HttpServletRequest request) {

    int httpStatus = HttpStatus.METHOD_NOT_ALLOWED.value();
    ErrorDtoRes apiErrorResponse = new ErrorDtoRes(
        httpStatus,
        request.getMethod(),
        "metodo HTTP no permitado, Revisa el metodo HTTP de la request.",
        exception.getMessage(),
        timestamp,
        null
    );

    return ResponseEntity.status(httpStatus).body(apiErrorResponse);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorDtoRes> handleMethodArgumentNotValidException(
      MethodArgumentNotValidException exception, HttpServletRequest request) {

    int httpStatus = HttpStatus.BAD_REQUEST.value();
    List<ObjectError> errors = exception.getAllErrors();
    List<String> details = errors.stream().map(error -> {
      if (error instanceof FieldError fieldError) {
        return fieldError.getField() + ": " + fieldError.getDefaultMessage();
      }

      return error.getDefaultMessage();
    }).toList();

    ErrorDtoRes apiErrorResponse = new ErrorDtoRes(
        httpStatus,
        request.getMethod(),
        "La request tiene parametros invalidos o incompletos.",
        exception.getMessage(),
        timestamp,
        details
    );

    return ResponseEntity.status(httpStatus).body(apiErrorResponse);
  }

  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  public ResponseEntity<ErrorDtoRes> handleMethodArgumentTypeMismatchException(
      MethodArgumentTypeMismatchException exception,
      HttpServletRequest request) {

    int httpStatus = HttpStatus.BAD_REQUEST.value();
    Object valueRejected = exception.getValue();
    String propertyName = exception.getName();

    ErrorDtoRes apiErrorResponse = new ErrorDtoRes(
        httpStatus,
        request.getMethod(),
        "Request Invalido: el valor proporcionado " + valueRejected
            + " no tiene el type esperado " + "para el " + propertyName,
        exception.getMessage(),
        timestamp,
        null
    );

    return ResponseEntity.status(httpStatus).body(apiErrorResponse);
  }

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<ErrorDtoRes> handleBadCredentialsException(
      BadCredentialsException exception,
      HttpServletRequest request) {

    int httpStatus = HttpStatus.UNAUTHORIZED.value();
    ErrorDtoRes apiErrorResponse = new ErrorDtoRes(
        httpStatus,
        request.getMethod(),
        "Credenciales invalidas",
        exception.getMessage(),
        timestamp,
        null
    );

    return ResponseEntity.status(httpStatus).body(apiErrorResponse);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorDtoRes> handleAllExceptions(Exception exception,
      HttpServletRequest request) {

    int httpStatus = HttpStatus.INTERNAL_SERVER_ERROR.value();
    ErrorDtoRes apiErrorResponse = new ErrorDtoRes(
        httpStatus,
        request.getMethod(),
        "Ocurrio un error inesperado.",
        exception.getMessage(),
        timestamp,
        null
    );

    return ResponseEntity.status(httpStatus).body(apiErrorResponse);
  }
}
