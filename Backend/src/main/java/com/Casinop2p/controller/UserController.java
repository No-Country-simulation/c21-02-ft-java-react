package com.Casinop2p.controller;

import com.Casinop2p.dto.UserDTORes;
import com.Casinop2p.entity.UserEntity;
import com.Casinop2p.repository.UserRepository;
import com.Casinop2p.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    // Buscar usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<UserDTORes> findOneById(@PathVariable Long id) {
        UserDTORes usuario = userService.getUser(id);

            return ResponseEntity.ok(usuario);
        }


}
