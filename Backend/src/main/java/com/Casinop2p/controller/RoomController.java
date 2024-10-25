package com.Casinop2p.controller;

import com.Casinop2p.Mapper.EntityMapper;
import com.Casinop2p.dto.BetDTO;
import com.Casinop2p.dto.RoomRequestDTO;
import com.Casinop2p.dto.RoomResponseDTO;
import com.Casinop2p.entity.BetEntity;
import com.Casinop2p.entity.RoomEntity;
import com.Casinop2p.entity.SportEventEntity;
import com.Casinop2p.entity.UserEntity;
import com.Casinop2p.repository.BetRepository;
import com.Casinop2p.repository.RoomRepository;
import com.Casinop2p.repository.SportEventRepository;
import com.Casinop2p.repository.UserRepository;
import com.Casinop2p.service.RoomService;
import com.Casinop2p.service.SportEventService;
import com.Casinop2p.util.BetEnum;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;
    private final SportEventRepository sportEventRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final BetRepository betRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<RoomResponseDTO> createRoom(@AuthenticationPrincipal UserDetails userDetails, @RequestBody RoomRequestDTO room, @RequestParam Long eventId) {

        UserEntity user = (UserEntity) userDetails; //tenemos una entidad usuario
        List<UserEntity> listOfUsers = new ArrayList<>();//lista vacia de usuarios para luego mandarlo a "usuarios d la sala"
        SportEventEntity sportEventEntity = sportEventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Evento no encontrado "));//rescatamos el evento deportivo

        if(user.getBalance() < room.bet()) { //controla el balance del usuarioOWner y en caso de no tener el balance se cancela.
            throw new RuntimeException("You don't have enough balance");
        }


        user.setBalance(user.getBalance()- room.bet());
        userRepository.save(user);
        listOfUsers.add(user);


        //CREAR SALA y GUARDARLA
        RoomEntity roomEntity = RoomEntity.builder()
                .roomName(room.roomName())
                .enable(true)
                .result(sportEventEntity.getResult())
                .bet(room.bet())
                .maxUsers(room.maxUsers())
                .roomOwner(user)
                .usersInRoom(listOfUsers)
                .privateRoom(room.privateRoom())
                .betDescription(sportEventEntity.getDescription())
                .expirationDate(sportEventEntity.getEventDate())
                .creationDate(Date.valueOf(LocalDate.now()))
                .sportEvent(sportEventEntity)
                .bets(new ArrayList<>())
                .build();
         roomRepository.save(roomEntity);

        // El owner realiza la apuesta
        BetEntity ownerBet = new BetEntity();
        ownerBet.setUser(user);
        ownerBet.setRoom(roomEntity);
        ownerBet.setAmount(room.bet());  // Monto de la apuesta del owner
        ownerBet.setBetType(room.ownerBet());  // El tipo de apuesta del owner
        // Asignar el equipo según el tipo de apuesta del owner
        if (room.ownerBet() == BetEnum.TEAM1_WIN) {
            ownerBet.setTeam(sportEventEntity.getTeam1());  // Asociar con team1 del evento
        } else if (room.ownerBet() == BetEnum.TEAM2_WIN) {
            ownerBet.setTeam(sportEventEntity.getTeam2());  // Asociar con team2 del evento
        } else if (room.ownerBet() == BetEnum.DRAW) {
            ownerBet.setTeam(null);  // No asociar ningún equipo, ya que es un empate
        }

        betRepository.save(ownerBet);

        roomEntity.getBets().add(ownerBet);
        roomRepository.save(roomEntity);

        RoomResponseDTO roomResponseDTO = EntityMapper.toRoomResponseDTO(roomEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(roomResponseDTO);
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
            @RequestBody BetDTO betDTO) {
        BetEntity bet = roomService.placeBet(roomId, betDTO.getUserId(), betDTO.getBetEnum(), betDTO.getAmount());
        return ResponseEntity.ok(bet);
    }

    // Endpoint para cerrar la sala y calcular resultados
    @PostMapping("/{roomId}/close")
    public ResponseEntity<Void> closeRoom(
            @PathVariable Long roomId,
            @RequestParam BetEnum result) {
       // roomService.closeRoom(roomId, result);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{roomId}/join")
    public ResponseEntity<RoomResponseDTO> joinRoom(
            @PathVariable Long roomId,
            @AuthenticationPrincipal UserEntity user,
            @RequestBody BetDTO betDTO) {

        RoomEntity updatedRoom = roomService.addUserToRoom(roomId, user, betDTO.getBetEnum());
        RoomResponseDTO response = EntityMapper.toRoomResponseDTO(updatedRoom);
        return ResponseEntity.ok(response);
    }


}

