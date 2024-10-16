package com.Casinop2p.dto;

import java.util.Date;

public record RoomDTO(Long id,
                      String roomName,
                      boolean enable,
                      float bet,
                      int maxUsers,
                      boolean privateRoom,
                      Date expirationDate,
                      Date creationDate,
                      float totalAmount) {
}
