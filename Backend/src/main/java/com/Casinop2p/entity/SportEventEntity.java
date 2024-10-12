package com.Casinop2p.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
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

    @Column(name="result")
    private String result;
}
