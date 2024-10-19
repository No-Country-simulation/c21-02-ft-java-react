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
    private Long id;
    private String name;
    private String profileImage;
    private float balance;
}






