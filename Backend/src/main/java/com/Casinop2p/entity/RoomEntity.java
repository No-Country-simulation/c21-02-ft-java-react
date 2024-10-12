package com.Casinop2p.entity;

import com.Casinop2p.util.BetEnum;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Driver;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;


@Entity
@Data
public class RoomEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomName; //boca vs river

    private boolean enable; //default:true

    private boolean privateRoom;//sala publica/privada

    private UserEntity roomOwner; // PEPITO

    private float bet; // apuesta fija $1000

    private int maxUsers; // ej: 10

    @Enumerated(EnumType.STRING)
    private BetEnum result; // 2-1

    private Integer winnerName;

    private Date expirationDate; //fecha del comienzo del evento
    private Date creationDate; //cuando se crea



    //@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    //@JoinTable(name = "bets", joinColumns = @JoinColumn(name = "bet_id"), inverseJoinColumns = @JoinColumn(name = "room_id"))
    //private Set<BetEntity> betsList = new HashSet<>();




}
