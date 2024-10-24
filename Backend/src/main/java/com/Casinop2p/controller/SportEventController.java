package com.Casinop2p.controller;

import com.Casinop2p.entity.RoomEntity;
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



    /*GetMapping
    public ResponseEntity<List<RoomEntity>> getAllEvents(){
        List<RoomEntity> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }

     */
}
