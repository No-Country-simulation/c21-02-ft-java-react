package com.Casinop2p.dto;

import lombok.Builder;

@Builder
public record UserDTOWithoutBalance(
        Long id,
        String name,
        String email,
        String userEnum,
        String betTeam,
        String profileImage
) {
}
