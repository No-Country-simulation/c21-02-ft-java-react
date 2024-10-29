package com.Casinop2p.entity;

import com.Casinop2p.util.BetEnum;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)  // ID único de la sala
        private Long id;

        private String roomName;  // Nombre de la sala

        private boolean enable = true;  // Si la sala está habilitada o no para apuestas

         // Resultado de la apuesta: WIN, LOSS o DRAW
        private String result;

        private float bet;  // Monto estándar de la apuesta en la sala (opcional)

        private int maxUsers;  // Máximo número de usuarios permitidos en la sala
        private boolean isPaidOut = false;

        @ManyToOne
        @JoinColumn(name="room_owner_id",nullable = false)
        private UserEntity roomOwner;  // El creador de la sala

        @ManyToMany(fetch = FetchType.EAGER)
        @ToString.Exclude
        private Set<UserEntity> usersInRoom = new HashSet<>();

        private boolean privateRoom;  // Si la sala es privada o no

       // @ManyToMany
       // private List<UserEntity> invitedUsers = new ArrayList<>();  // Usuarios invitados si es sala privada

        private String betDescription;  // Descripción general de la apuesta

        @Temporal(TemporalType.TIMESTAMP)
        private Date expirationDate;  // Fecha en la que expira la sala

        @Temporal(TemporalType.TIMESTAMP)
        private Date creationDate;  // Fecha de creación de la sala

       //private float totalAmount;  // Cantidad total acumulada en apuestas dentro de la sala

        @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
        private Set<BetEntity> bets = new HashSet<>();

        @ManyToOne
        @JoinColumn(name = "sport_event_id", nullable = false)
        private SportEventEntity sportEvent;  // Relación con el evento deportivo

        @PrePersist
        protected void onCreate() {
            creationDate = new Date();  // Fecha de creación se asigna automáticamente
            //expirationDate = Date.from(creationDate.toInstant().plusSeconds(3600));  // Sala expira en una hora
                if (sportEvent != null) {
                        expirationDate = sportEvent.getEventDate();  // Expiración según la fecha del evento
                }
        }

        @Override
        public String toString() {
                return "RoomEntity{" +
                        "id=" + id +
                        ", roomName='" + roomName + '\'' +
                        ", enable=" + enable +
                        ", bet=" + bet +
                        // Excluir "usersInRoom" y otras relaciones problemáticas
                        '}';
        }

        // TRAER EL SPORTEVENT A LA ENTIDAD ROOM


}


