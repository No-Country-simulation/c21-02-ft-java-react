package com.Casinop2p.repository;

import com.Casinop2p.entity.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<RoomEntity,Long> {

    @Query("SELECT r FROM RoomEntity r " +
            "LEFT JOIN FETCH r.usersInRoom " +
            "LEFT JOIN FETCH r.bets " +
            "WHERE r.id = :id")
    Optional<RoomEntity> findRoomByIdWithUsersAndBets(Long id);
}


