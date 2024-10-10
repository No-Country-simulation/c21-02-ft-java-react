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
import org.springframework.stereotype.Service;

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
    public BetEntity placeBet(Long roomId, Long userId, BetEnum betEnum, float amount) {
        RoomEntity room = getRoomById(roomId);  // Buscar la sala
        UserEntity user = userRepository.findById(userId)  // Buscar el usuario
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + userId));

        // Verificar si el usuario tiene suficiente saldo
        if (user.getBalance() < amount) {
            throw new RuntimeException("Saldo insuficiente para realizar la apuesta");
        }

        // 5. Crear una nueva entidad de apuesta
        BetEntity bet = new BetEntity();
        bet.setBetEnum(betEnum); // El tipo de apuesta (WIN, LOSS, DRAW)
        bet.setAmount(amount);   // El monto apostado
        bet.setRoom(room);       // La sala donde se realiza la apuesta
        bet.setUser(user);       // El usuario que realiza la apuesta


        // Descontar el dinero del saldo del usuario
        user.setBalance(user.getBalance() - amount);
        userRepository.save(user);

        // Guardar la apuesta en la base de datos
        BetEntity savedBet = betRepository.save(bet);

        // Añadir la apuesta a la sala
        room.getBets().add(savedBet);
        room.calculateTotalAmount();  // Recalcular el monto total de la sala
        roomRepository.save(room);

        return savedBet;
    }


    // Método para cerrar la sala y calcular los resultados
    public void closeRoom(Long roomId, BetEnum result) {
        RoomEntity room = getRoomById(roomId);
        room.setResult(result);  // Establecer el resultado de la sala (quién ganó)

        // Repartir el dinero a los ganadores
        room.getBets().forEach(bet -> {
            if (bet.getBetEnum() == result) {
                UserEntity user = bet.getUser();
                float winnings = bet.getAmount() * 2;  // Ganancia es el doble de la apuesta
                user.setBalance(user.getBalance() + winnings);  // Añadir la ganancia al usuario
                userRepository.save(user);  // Guardar el nuevo balance
            }
        });

        // Desactivar la sala después de que se haya repartido el dinero
        room.setEnable(false);
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
}

