package com.Casinop2p.entity;

import com.Casinop2p.util.BetEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SportEventEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="event_name")
    private String eventName;

    @Column(name="description")
    private String description;

    @Column(name="event_date")
    private Date eventDate;

    @NonNull
    @Column(name="team1")
    private String team1;

    @NonNull
    @Column(name="team2")
    private String team2;

    @Column(name="result")
    @Enumerated(EnumType.STRING)
    private BetEnum result;
}
