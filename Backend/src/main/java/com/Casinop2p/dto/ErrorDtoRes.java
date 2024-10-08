package com.Casinop2p.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.util.List;

public record ErrorDtoRes(
    @JsonProperty("status_code")
    Integer statusCode,
    @JsonProperty("http_method")
    String httpMethod,
    String message,
    @JsonProperty("server_message")
    String backendMessage,
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    LocalDateTime timestamp,
    List<String> details
) {

}
