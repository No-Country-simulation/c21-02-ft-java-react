package com.Casinop2p.repository;

import com.Casinop2p.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email); // Método para encontrar un usuario por email
    Optional<UserEntity> findByName(String name);
}

