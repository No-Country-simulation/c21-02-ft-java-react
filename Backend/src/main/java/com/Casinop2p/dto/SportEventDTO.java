package com.Casinop2p.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SportEventDTO {

    private Long id;
    private String eventName;
    private String description;
    private Date eventDate;
    private String team1;
    private String team2;
    private String result;
}
