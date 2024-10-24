package com.Casinop2p.dto;

public record RoomRequestDTO(
                             String roomName,
                             float bet,
                             int maxUsers,
                             boolean privateRoom

                            ) {
}
