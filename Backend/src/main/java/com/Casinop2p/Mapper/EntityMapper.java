package com.Casinop2p.Mapper;

import com.Casinop2p.dto.RoomResponseDTO;
import com.Casinop2p.dto.SportEventDTO;
import com.Casinop2p.dto.UserDTORes;
import com.Casinop2p.entity.BetEntity;
import com.Casinop2p.entity.RoomEntity;

import java.util.stream.Collectors;

public class EntityMapper {

    // Método para convertir RoomEntity a RoomResponseDTO
    public static RoomResponseDTO toRoomResponseDTO(RoomEntity roomEntity) {
        RoomResponseDTO dto = new RoomResponseDTO();
        dto.setId(roomEntity.getId());
        dto.setRoomName(roomEntity.getRoomName());
        dto.setRoomOwnerName(roomEntity.getRoomOwner() != null ? roomEntity.getRoomOwner().getName() : "Unknown");
        dto.setEnable(roomEntity.isEnable());
        dto.setBet(roomEntity.getBet());
        dto.setMaxUsers(roomEntity.getMaxUsers());
        dto.setPrivateRoom(roomEntity.isPrivateRoom());
        dto.setBetDescription(roomEntity.getBetDescription());
        dto.setExpirationDate(roomEntity.getExpirationDate());
        dto.setCreationDate(roomEntity.getCreationDate());
        dto.setPaidOut(roomEntity.isPaidOut());

        // Manejo seguro de usersInRoom y apuestas
        dto.setUsersInRoom(roomEntity.getUsersInRoom().stream()
                .map(user -> {
                    String betTeam = roomEntity.getBets() != null ? roomEntity.getBets().stream()
                            .filter(bet -> bet.getUser() != null && bet.getUser().getId().equals(user.getId()))
                            .map(BetEntity::getTeam)
                            .findFirst()
                            .orElse("No Bet") : "No Bet";

                    return UserMapper.toDTOWithoutBalance(user, betTeam);
                })
                .collect(Collectors.toList()));

        // Mapear SportEventEntity a SportEventDTO
        if (roomEntity.getSportEvent() != null) {
            SportEventDTO sportEventDTO = new SportEventDTO(
                    roomEntity.getSportEvent().getId(),
                    roomEntity.getSportEvent().getEventName(),
                    roomEntity.getSportEvent().getDescription(),
                    roomEntity.getSportEvent().getEventDate(),
                    roomEntity.getSportEvent().getTeam1(),
                    roomEntity.getSportEvent().getTeam2(),
                    roomEntity.getSportEvent().getResult()
            );
            dto.setSportEvent(sportEventDTO);
        }

        return dto;
    }
}
