package com.Casinop2p.dto;

import com.Casinop2p.util.BetEnum;

public record RoomRequestDTO(
                             String roomName,
                             float bet,
                             int maxUsers,
                             boolean privateRoom,
                             BetEnum ownerBet

                            ) {
}
