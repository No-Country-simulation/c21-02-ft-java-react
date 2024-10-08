package com.Casinop2p.entity;

import com.Casinop2p.util.BetEnum;
import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class BetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //private UserEntity user;
    private String team;
    @Enumerated(EnumType.STRING)
    private BetEnum betEnum;
    //private RoomEntity room;




}
