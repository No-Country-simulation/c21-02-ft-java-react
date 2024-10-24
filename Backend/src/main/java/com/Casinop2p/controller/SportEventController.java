package com.Casinop2p.controller;

import com.Casinop2p.entity.RoomEntity;
import com.Casinop2p.entity.SportEventEntity;
import com.Casinop2p.service.SportEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpResponse;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/event")
@RequiredArgsConstructor
public class SportEventController {

    private final SportEventService sportEventService;


    @GetMapping
    public ResponseEntity<List<SportEventEntity>> getAllEvents(){
        List<SportEventEntity> events = sportEventService.getAllEvents();
        return ResponseEntity.ok(events);
    }


}
