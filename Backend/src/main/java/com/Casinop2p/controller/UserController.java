package com.Casinop2p.controller;

import com.Casinop2p.dto.UserDTOReq;
import com.Casinop2p.dto.UserDTORes;
import com.Casinop2p.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;



@RequiredArgsConstructor
@CrossOrigin("*")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Crear un nuevo usuario
    @PostMapping("/create")
    public ResponseEntity<UserDTORes> createUser(@Valid @RequestBody UserDTOReq userDTOReq) {

        UserDTORes createdUser = userService.createUser(userDTOReq);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<UserDTORes> getUserById(@PathVariable Long id) {
        UserDTORes user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    // Actualizar un usuario por ID
    @PutMapping("/{id}")
    public ResponseEntity<UserDTORes> updateUser(@PathVariable Long id, @Valid @RequestBody UserDTOReq userDTOReq) {
        UserDTORes updatedUser = userService.updateUser(id, userDTOReq);
        return ResponseEntity.ok(updatedUser);
    }

    // Eliminar un usuario por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // Obtener todos los usuarios
    @GetMapping
    public ResponseEntity<List<UserDTORes>> getAllUsers() {
        List<UserDTORes> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}

