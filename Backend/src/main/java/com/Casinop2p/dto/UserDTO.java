package com.Casinop2p.dto;

public record UserDTO(Long id,
                      String name,
                      String email,
                      float balance,
                      String userEnum) {
}
