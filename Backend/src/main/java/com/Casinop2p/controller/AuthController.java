package com.Casinop2p.controller;

import com.Casinop2p.dto.LoginDTO;
import com.Casinop2p.dto.LoginDTORes;
import com.Casinop2p.dto.UserDTORes;
import com.Casinop2p.entity.UserEntity;
import com.Casinop2p.repository.UserRepository;
import com.Casinop2p.service.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<LoginDTORes> login(@RequestBody LoginDTO loginDTO) {

        System.out.println(loginDTO);

        Authentication authentication = new UsernamePasswordAuthenticationToken(loginDTO.email(), loginDTO.password());
        authenticationManager.authenticate(authentication);

        SecurityContextHolder.getContext().setAuthentication(authentication);


        UserEntity user = userRepository.findByEmail(loginDTO.email()).orElseThrow();

        String jwt = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(
                LoginDTORes.builder()
                        .jwt(jwt)
                        .id(user.getId())
                        .email(loginDTO.email())
                        .role(user.getUserEnum().toString())
                        .name(user.getName())
                        .profileImage(user.getProfileImage())
                        .balance(user.getBalance())
                        .build()
        );

    }

    @GetMapping("/user-session")
    public ResponseEntity<UserDTORes> userSession(@RequestHeader("Authorization") String jwtToken) {

        String jwt = jwtToken.substring(7);
        Optional<UserEntity> userTemp = userRepository.findByEmail(jwtUtil.decodeJWT(jwt).getSubject()); //obtener a partir de getSubjetc el usuario


        return ResponseEntity.ok(
                UserDTORes.builder()


                        .id(userTemp.get().getId())
                        .name(userTemp.get().getName())
                        .balance(userTemp.get().getBalance())
                        .email(userTemp.get().getEmail())
                        .userEnum(userTemp.get().getUserEnum().toString())
                        .profileImage(userTemp.get().getProfileImage())
                        .build());
/*
        Authentication authentication = new UsernamePasswordAuthenticationToken(loginDTO.email(), loginDTO.password());
        authenticationManager.authenticate(authentication);

        SecurityContextHolder.getContext().setAuthentication(authentication);


        UserEntity user = userRepository.findByEmail(loginDTO.email()).orElseThrow();

        String jwt = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(
                LoginDTORes.builder()
                        .jwt(jwt)
                        .id(user.getId())
                        .email(loginDTO.email())
                        .role(user.getUserEnum().toString())
                        .name(user.getName())
                        .build()
        )
                ;


    }    */

    }


}


