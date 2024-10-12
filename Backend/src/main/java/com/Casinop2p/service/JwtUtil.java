package com.Casinop2p.service;


import com.Casinop2p.entity.UserEntity;
import com.Casinop2p.repository.UserRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class JwtUtil {
    @Autowired
    private Environment environment;
    @Autowired
    private UserRepository userRepository;

    public String generateToken(String email) {

        UserEntity user = userRepository.findByEmail(email) //aca recupero el usuario
                .orElseThrow(() -> new NoSuchElementException("User not found with email: " + email));

        Algorithm algorithm = Algorithm.HMAC256(environment.getProperty("SECRET_KEY_TOKEN_LOGIN"));
        return JWT.create()
                .withClaim("userId", user.getId()) //le paso el id de usuario recuperado
                .withIssuer("Casinop2p")
                .withSubject(email)
                .sign(algorithm);
    }

    public String validateAndGetSubject(String token) {
        Algorithm algorithm = Algorithm.HMAC256(environment.getProperty("SECRET_KEY_TOKEN_LOGIN"));
        return JWT.require(algorithm)
                .withIssuer("Casinop2p")
                .build()
                .verify(token)
                .getSubject();
    }


    // Método para obtener el ID del usuario desde el token JWT
    public Long getUserIdFromToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(environment.getProperty("SECRET_KEY_TOKEN_LOGIN"));
        return JWT.require(algorithm)
                .withIssuer("Casinop2p")
                .build()
                .verify(token)
                .getClaim("userId").asLong();  // Extraer el ID del usuario del claim
    }
}

