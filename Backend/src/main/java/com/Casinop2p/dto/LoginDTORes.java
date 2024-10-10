package com.Casinop2p.dto;

import lombok.*;



@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginDTORes {
    private String jwt;
    private String role;
    private String email;
}
