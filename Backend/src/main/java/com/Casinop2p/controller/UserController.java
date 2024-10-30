package com.Casinop2p.controller;

import com.Casinop2p.dto.UserDTOReq;
import com.Casinop2p.dto.UserDTORes;
import com.Casinop2p.entity.UserEntity;
import com.Casinop2p.service.CloudinaryService;
import com.Casinop2p.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;



@RequiredArgsConstructor
@CrossOrigin("*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CloudinaryService cloudinaryService;

    // Crear un nuevo usuario
    @PostMapping
    public ResponseEntity<UserDTORes> createUser(@Valid @RequestBody UserDTOReq userDTOReq) {
        System.out.println(userDTOReq);
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
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // Obtener todos los usuarios
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserDTORes>> getAllUsers() {
        List<UserDTORes> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<UserDTORes> uploadProfileImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) throws IOException {
        String imageUrl = cloudinaryService.uploadImage(file);
        UserDTORes updatedUser = userService.updateProfileImage(id, imageUrl);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/upload-image-url")
    public ResponseEntity<UserDTORes> uploadProfileImageByUrl(
            @AuthenticationPrincipal UserEntity loggedInUser,
            @RequestBody String imageUrl) throws IOException {
        String uploadedUrl = cloudinaryService.uploadImageByUrl(imageUrl);
        UserDTORes updatedUser = userService.updateProfileImage(loggedInUser.getId(), uploadedUrl);
        return ResponseEntity.ok(updatedUser);
    }
}

