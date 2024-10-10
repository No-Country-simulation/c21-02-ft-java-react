package com.Casinop2p.dto;

import com.Casinop2p.util.BetEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BetDTO {
    private Long userId;        // ID del usuario que realiza la apuesta
    private BetEnum betEnum;    // Tipo de apuesta (WIN, LOSS, DRAW)
    private float amount;       // Cantidad apostada
}

