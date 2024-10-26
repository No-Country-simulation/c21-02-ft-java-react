package com.Casinop2p.Mapper;

import com.Casinop2p.dto.RoomResponseDTO;
import com.Casinop2p.entity.RoomEntity;

import java.util.stream.Collectors;

public class EntityMapper {

    // Método para convertir RoomEntity a RoomResponseDTO
    public static RoomResponseDTO toRoomResponseDTO(RoomEntity roomEntity) {
        RoomResponseDTO dto = new RoomResponseDTO();
        dto.setId(roomEntity.getId());
        dto.setRoomName(roomEntity.getRoomName());
        dto.setRoomOwnerName(roomEntity.getRoomOwner().getName()); // Solo devuelve el nombre del propietario
        dto.setEnable(roomEntity.isEnable());
        dto.setBet(roomEntity.getBet());
        dto.setMaxUsers(roomEntity.getMaxUsers());
        dto.setPrivateRoom(roomEntity.isPrivateRoom());
        dto.setBetDescription(roomEntity.getBetDescription());
        dto.setExpirationDate(roomEntity.getExpirationDate());
        dto.setCreationDate(roomEntity.getCreationDate());

        dto.setUsersInRoom(roomEntity.getUsersInRoom().stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList()));

        return dto;
    }
}
