package com.Casinop2p.entity;


import com.Casinop2p.util.UserEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NonNull;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    private String Name;


   @Column(nullable = false)
    private String password;

    private float balance;


    @Column(unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    private UserEnum userEnum;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "bet_list", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "room_id"))
    private Set<RoomEntity> betList = new HashSet<>();


}
