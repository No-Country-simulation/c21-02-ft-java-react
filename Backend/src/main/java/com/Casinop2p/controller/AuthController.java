package com.Casinop2p.controller;

import com.Casinop2p.dto.LoginDTO;
import com.Casinop2p.dto.LoginDTORes;
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

@RestController
@RequestMapping("/auth")
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

        Authentication authentication = new UsernamePasswordAuthenticationToken(loginDTO.email(), loginDTO.password());

        authenticationManager.authenticate(authentication);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserEntity user = userRepository.findByEmail(loginDTO.email()).orElseThrow();

        String jwt = jwtUtil.generateToken(loginDTO.email());
        //para mostrar mi id obtenido del jwt token =============
        Long userId = jwtUtil.getUserIdFromToken(jwt);
        System.out.println(userId); //imprime 2 lo saca del token
        //borrar comentario==============
        return ResponseEntity.ok(LoginDTORes.builder().jwt(jwt).email(loginDTO.email()).role(user.getUserEnum().name()).build());
    }

}


