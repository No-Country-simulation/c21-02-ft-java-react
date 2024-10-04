package com.Casinop2p.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NonNull;

@Data
@Entity
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Size(min = 3,max = 20)
    private String Name;

    @NonNull
    private String password;

    private float balance;

    @NonNull
    @Column(unique = true)
    @Email
    private String email;

}
