package com.Casinop2p.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.NonNull;

public record UserDTORes(Long id,
                      String name,
                         float balance,
                      String email,
                         String userEnum) {



}
