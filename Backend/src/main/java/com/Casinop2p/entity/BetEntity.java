package com.Casinop2p.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class BetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private RoomEntity room;

    private float betAmount; // este campo esta "repetido" ya que lo puedo obtener de roomentity

    private String betPrediction; // Predicción

    private boolean betWon; // Indica si la apuesta fue ganada

    private float payout; // Ganancias obtenidas (en caso de ganar)

    //private boolean settled; // estado del pago

}