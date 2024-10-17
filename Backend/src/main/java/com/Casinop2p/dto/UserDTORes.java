package com.Casinop2p.dto;

import lombok.Builder;

@Builder
public record UserDTORes(Long id,
                         String name,
                         float balance,
                         String email,
                         String userEnum) {


}
