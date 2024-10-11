package com.Casinop2p.controller;

import com.Casinop2p.Mapper.EntityMapper;
import com.Casinop2p.dto.BetDTO;
import com.Casinop2p.dto.RoomResponseDTO;
import com.Casinop2p.entity.BetEntity;
import com.Casinop2p.entity.RoomEntity;
import com.Casinop2p.entity.UserEntity;
import com.Casinop2p.service.RoomService;
import com.Casinop2p.util.BetEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping
    public ResponseEntity<RoomResponseDTO> createRoom(@AuthenticationPrincipal UserDetails userDetails, @RequestBody RoomEntity room) {
        UserEntity user = (UserEntity) userDetails;
        room.setRoomOwner(user);
        RoomEntity createdRoom = roomService.createRoom(room);

        // Aquí convertimos la entidad a un DTO antes de devolverla
        RoomResponseDTO response = EntityMapper.toRoomResponseDTO(createdRoom);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }



    @GetMapping("/{id}")
    public ResponseEntity<RoomEntity> getRoomById(@PathVariable Long id) {
        RoomEntity room = roomService.getRoomById(id);
        return ResponseEntity.ok(room);
    }

    @GetMapping
    public ResponseEntity<List<RoomEntity>> getAllRooms() {
        List<RoomEntity> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomEntity> updateRoom(@PathVariable Long id, @RequestBody RoomEntity room) {
        RoomEntity updatedRoom = roomService.updateRoom(id, room);
        return ResponseEntity.ok(updatedRoom);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }

    // endpoint para invitar a un usuario a una sala privada
    @PostMapping("/{roomId}/invite/{username}")
    public ResponseEntity<RoomEntity> inviteUserToRoom(@PathVariable Long roomId, @PathVariable String username) {
        RoomEntity updatedRoom = roomService.inviteUserToRoom(roomId, username);
        return ResponseEntity.ok(updatedRoom);
    }

    // Endpoint para hacer una apuesta
    @PostMapping("/{roomId}/bet")
    public ResponseEntity<BetEntity> placeBet(
            @PathVariable Long roomId,
            @RequestBody BetDTO betDTO) {  // @RequestBody para recibir un DTO con los detalles de la apuesta

        // Realizamos la apuesta usando los datos del DTO
        BetEntity bet = roomService.placeBet(roomId, betDTO.getUserId(), betDTO.getBetEnum(), betDTO.getAmount());

        return ResponseEntity.ok(bet);
    }

    // Endpoint para cerrar la sala y calcular resultados
    @PostMapping("/{roomId}/close")
    public ResponseEntity<Void> closeRoom(
            @PathVariable Long roomId,
            @RequestParam BetEnum result) {  // Recibimos el resultado de la apuesta como RequestParam

        // Cerramos la sala y calculamos el resultado
        roomService.closeRoom(roomId, result);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{roomId}/join")
    public ResponseEntity<RoomResponseDTO> joinRoom(@PathVariable Long roomId, @AuthenticationPrincipal UserDetails userDetails) {
        UserEntity user = (UserEntity) userDetails;

        // Llamamos al servicio para agregar el usuario a la sala
        RoomEntity updatedRoom = roomService.addUserToRoom(roomId, user);

        // Convertimos la entidad de la sala actualizada a DTO para devolverla en la respuesta
        RoomResponseDTO response = EntityMapper.toRoomResponseDTO(updatedRoom);
        return ResponseEntity.ok(response);
    }

}

