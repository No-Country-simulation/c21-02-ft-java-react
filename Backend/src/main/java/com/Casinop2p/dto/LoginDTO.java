package com.Casinop2p.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;

public record LoginDTO(
        @Pattern(regexp = "^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.[@#$%^&+=])(?=\\S+$).{8,}$",
                message = "La contraseña debe contener al menos un dígito, una letra minúscula, una letra mayúscula y un carácter especial.")
        String password, @Email
        String email
) {
}
