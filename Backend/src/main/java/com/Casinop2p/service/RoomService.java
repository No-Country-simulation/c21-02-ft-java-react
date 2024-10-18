package com.Casinop2p.service;

import com.Casinop2p.entity.BetEntity;
import com.Casinop2p.entity.RoomEntity;
import com.Casinop2p.entity.UserEntity;
import com.Casinop2p.util.BetEnum;
import jakarta.transaction.Transactional;

import java.util.List;

public interface RoomService {

    RoomEntity createRoom(RoomEntity room); // Crear una nueva sala

    RoomEntity getRoomById(Long id); // Obtener una sala por ID

    List<RoomEntity> getAllRooms(); // Obtener todas las salas

    RoomEntity updateRoom(Long id, RoomEntity room); // Actualizar una sala

    void deleteRoom(Long id); // Eliminar una sala

    List<RoomEntity> getAvailableRooms(); // Obtener salas habilitadas

    RoomEntity inviteUserToRoom(Long roomId, String name); // Invitar a un usuario a una sala privada

    BetEntity placeBet(Long roomId, Long userId, BetEnum betEnum, float amount);


    void closeRoom(Long roomId, BetEnum result);

    @Transactional
    RoomEntity addUserToRoom(Long roomId, UserEntity user);




}


