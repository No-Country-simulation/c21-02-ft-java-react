package com.Casinop2p.entity;

import com.Casinop2p.util.BetEnum;
import jakarta.persistence.*;
import lombok.Data;

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
    private String roomName;
    private boolean enable;
    //private UserEntity roomOwner;
    @Enumerated(EnumType.STRING)
    private BetEnum result;
    private float bet;
    private int maxUsers;
    //private ArrayList<UserEntity> usersInRoom;
    private boolean privateRoom;
    private String betDescription;
    private Date expirationDate; //esto se obtiene automaticamente
    private Date creationDate; //esto se obtiene automaticamente
    private float totalAmount;


    //@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    //@JoinTable(name = "bets", joinColumns = @JoinColumn(name = "bet_id"), inverseJoinColumns = @JoinColumn(name = "room_id"))
    //private Set<BetEntity> betsList = new HashSet<>();




}
