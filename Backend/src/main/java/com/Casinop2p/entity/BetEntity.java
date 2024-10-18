package com.Casinop2p.entity;

import com.Casinop2p.util.BetEnum;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.ConnectionBuilder;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class BetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Genera el ID de la apuesta automáticamente
    private Long id;

    private String team;  // Equipo por el cual el usuario está apostando


    @Enumerated(EnumType.STRING)
    private BetEnum betType;  // Tipo de apuesta (WIN, LOSS, DRAW)


    @ManyToOne
    private UserEntity user;  // El usuario que hizo la apuesta

    @ManyToOne
    private RoomEntity room;  // La sala en la que se hizo la apuesta

    private float amount;  // La cantidad de dinero apostada por el usuario



}
