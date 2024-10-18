package com.Casinop2p.service.imp;

import com.Casinop2p.entity.BetEntity;
import com.Casinop2p.entity.RoomEntity;
import com.Casinop2p.entity.UserEntity;
import com.Casinop2p.repository.BetRepository;
import com.Casinop2p.repository.RoomRepository;
import com.Casinop2p.repository.UserRepository;
import com.Casinop2p.service.RoomService;
import com.Casinop2p.util.BetEnum;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImp implements RoomService {

    private final RoomRepository roomRepository; // Acceso a la base de datos de salas
    private final UserRepository userRepository; // Necesitamos acceder a los usuarios.
    private final BetRepository betRepository;    // Acceso a la base de datos de apuestas

    @Override
    @Transactional// Crear una nueva sala
    public RoomEntity createRoom(RoomEntity room) {
        return roomRepository.save(room);
    }

    @Override // Obtener una sala por su ID
    public RoomEntity getRoomById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sala no encontrada con ID: " + id));
    }


    @Override // Obtener todas las salas habilitadas
    public List<RoomEntity> getAvailableRooms() {
        return roomRepository.findAll().stream()
                .filter(RoomEntity::isEnable)
                .toList();
    }


    // Método para que un usuario apueste en una sala
    @Override
    @Transactional
    public BetEntity placeBet(Long roomId, Long userId, BetEnum betEnum, float amount) {
        RoomEntity room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Sala no encontrada con ID: " + roomId));

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + userId));

        // Verificar que la sala está habilitada y que el evento aún no ha ocurrido
        if (!room.isEnable() || room.getExpirationDate().before(new Date())) {
            throw new RuntimeException("No se pueden hacer apuestas en esta sala.");
        }

        // Verificar que el usuario tiene suficiente balance
        if (user.getBalance() < amount) {
            throw new RuntimeException("Saldo insuficiente.");
        }

        // Crear la apuesta
        BetEntity bet = new BetEntity();
        bet.setUser(user);
        bet.setRoom(room);
        bet.setAmount(amount);
        bet.setBetType(betEnum);
        // Establecer el equipo por el que apuesta (opcional)
        // bet.setTeam(betEnum.name());

        // Reducir el balance del usuario
        user.setBalance(user.getBalance() - amount);
        userRepository.save(user);

        // Agregar la apuesta a la sala
        room.getBets().add(bet);
        room.calculateTotalAmount();
        roomRepository.save(room);

        // Guardar la apuesta
        return betRepository.save(bet);
    }


    // Método para cerrar la sala y calcular los resultados
    @Override
    @Transactional
    public void closeRoom(Long roomId, BetEnum result) {
        RoomEntity room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Sala no encontrada con ID: " + roomId));

        // Establecer el resultado del evento
        room.setResult(result);

        // Deshabilitar la sala para nuevas apuestas
        room.setEnable(false);

        // Calcular y distribuir ganancias
        List<BetEntity> bets = room.getBets();

        // Sumar total de apuestas ganadoras
        float totalWinningAmount = bets.stream()
                .filter(bet -> bet.getBetType() == result)
                .map(BetEntity::getAmount)
                .reduce(0f, Float::sum);

        // Si nadie ganó, el dinero podría quedarse en la casa o ser distribuido de otra manera
        if (totalWinningAmount == 0) {
            // Manejar caso donde nadie ganó
            // Por ejemplo, el dinero se queda en la casa
            return;
        }

        // Distribuir ganancias a los ganadores
        for (BetEntity bet : bets) {
            if (bet.getBetType() == result) {
                // Calcular proporción de la apuesta del usuario sobre el total de apuestas ganadoras
                float userProportion = bet.getAmount() / totalWinningAmount;

                // Calcular ganancia del usuario
                float userWinning = room.getTotalAmount() * userProportion;

                // Actualizar balance del usuario
                UserEntity user = bet.getUser();
                user.setBalance(user.getBalance() + userWinning);
                userRepository.save(user);
            }
        }

        // Guardar cambios en la sala
        roomRepository.save(room);
    }


    @Override// listar toda las salas
    public List<RoomEntity> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override// actualizar sala
    public RoomEntity updateRoom(Long id, RoomEntity room) {
        RoomEntity existingRoom = getRoomById(id);
        existingRoom.setRoomName(room.getRoomName());
        existingRoom.setBet(room.getBet());
        existingRoom.setMaxUsers(room.getMaxUsers());
        existingRoom.setPrivateRoom(room.isPrivateRoom());
        existingRoom.setBetDescription(room.getBetDescription());
        return roomRepository.save(existingRoom);
    }

    @Override//eliminar sala
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

    @Override
    public RoomEntity inviteUserToRoom(Long roomId, String username) {
        RoomEntity room = getRoomById(roomId); // Buscamos la sala

        if (!room.isPrivateRoom()) {
            throw new RuntimeException("No se pueden invitar usuarios a una sala pública");
        }

        UserEntity user = userRepository.findByName(username) // Buscamos el usuario por su nombre
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username));

        // Añadimos el usuario a la lista de invitados
        room.getInvitedUsers().add(user);
        return roomRepository.save(room); // Guardamos los cambios en la sala
    }

    @Transactional
    @Override
    public RoomEntity addUserToRoom(Long roomId, UserEntity user) {
        // Buscamos la sala por ID
        RoomEntity room = getRoomById(roomId);


        if (room.getUsersInRoom().stream().anyMatch(e -> e.getId().equals(user.getId()))) {
            throw new RuntimeException("El usuario ya es parte de la sala.");
        }

        // Verificamos si la sala está habilitada y si hay espacio
        if (!room.isEnable()) {
            throw new RuntimeException("La sala está cerrada para nuevas apuestas.");
        }

        if (room.getUsersInRoom().size() >= room.getMaxUsers()) {
            throw new RuntimeException("La sala ha alcanzado el número máximo de usuarios.");
        }


        // Agregamos al usuario a la sala
        room.getUsersInRoom().add(user);

        // Guardamos los cambios
        return roomRepository.save(room);
    }



    @Scheduled(fixedRate = 60000) // Se ejecuta cada 60 segundos (1 minuto)
    public void checkRoomExpiration() {
        List<RoomEntity> rooms = roomRepository.findAll();
        Date currentDate = new Date();

        for (RoomEntity room : rooms) {
            // Verifica si la fecha de expiración o event_date ha pasado y la sala aún está habilitada
            if (room.isEnable() && room.getExpirationDate() != null && room.getExpirationDate().before(currentDate)) {
                room.setEnable(false); // Deshabilitar la sala
                roomRepository.save(room); // Actualizar en la base de datos
            }
        }
    }
}

