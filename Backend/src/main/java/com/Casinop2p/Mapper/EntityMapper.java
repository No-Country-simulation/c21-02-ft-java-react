package com.Casinop2p.Mapper;

import com.Casinop2p.dto.RoomResponseDTO;
import com.Casinop2p.dto.SportEventDTO;
import com.Casinop2p.dto.UserDTORes;
import com.Casinop2p.entity.BetEntity;
import com.Casinop2p.entity.RoomEntity;
import com.Casinop2p.entity.SportEventEntity;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

public class EntityMapper {

    // Método para convertir RoomEntity a RoomResponseDTO
    public static RoomResponseDTO toRoomResponseDTO(RoomEntity roomEntity) {
        RoomResponseDTO dto = new RoomResponseDTO();
        dto.setId(roomEntity.getId());
        dto.setRoomName(roomEntity.getRoomName());
        dto.setRoomOwnerName(
                roomEntity.getRoomOwner() != null ? roomEntity.getRoomOwner().getName() : "Unknown"
        );
        dto.setEnable(roomEntity.isEnable());
        dto.setBet(roomEntity.getBet());
        dto.setMaxUsers(roomEntity.getMaxUsers());
        dto.setPrivateRoom(roomEntity.isPrivateRoom());
        dto.setBetDescription(roomEntity.getBetDescription());
        dto.setExpirationDate(roomEntity.getExpirationDate());
        dto.setCreationDate(roomEntity.getCreationDate());

        // Verifica que usersInRoom no sea nulo antes de procesarlo
        dto.setUsersInRoom(
                Optional.ofNullable(roomEntity.getUsersInRoom())
                        .orElse(new ArrayList<>())
                        .stream()
                        .map(user -> {
                            String betTeam = "No Bet";
                            if (roomEntity.getBets() != null) {
                                betTeam = Optional.ofNullable(roomEntity.getBets())
                                        .orElse(new ArrayList<>())
                                        .stream()
                                        .filter(bet -> bet.getUser() != null && bet.getUser().getId() != null && bet.getUser().getId().equals(user.getId()))
                                        .map(BetEntity::getTeam)
                                        .findFirst()
                                        .orElse("No Bet");
                            }
                            return UserMapper.toDTOWithoutBalance(user, betTeam);
                        })
                        .collect(Collectors.toList())
        );

        // Verificación de SportEventEntity para evitar NPE
        if (roomEntity.getSportEvent() != null) {
            SportEventEntity sportEvent = roomEntity.getSportEvent();
            SportEventDTO sportEventDTO = new SportEventDTO(
                    sportEvent.getId(),
                    sportEvent.getEventName(),
                    sportEvent.getDescription(),
                    sportEvent.getEventDate(),
                    sportEvent.getTeam1() != null ? sportEvent.getTeam1() : "Unknown",
                    sportEvent.getTeam2() != null ? sportEvent.getTeam2() : "Unknown",
                    sportEvent.getResult()
            );
            dto.setSportEvent(sportEventDTO);
        }

        return dto;
    }
}
