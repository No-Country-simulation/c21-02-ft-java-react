package com.Casinop2p.service;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtUtil {

    @Autowired
    private Environment environment;

    public String generateToken(String username) {
        Algorithm algorithm = Algorithm.HMAC256(environment.getProperty("SECRET_KEY_TOKEN_LOGIN"));
        return JWT.create()
                .withIssuer("Casinop2p")
                .withSubject(username)
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

    public DecodedJWT decodeJWT(String token) {
        // Decodifica el JWT sin validar la firma
        DecodedJWT decodedJWT = JWT.decode(token);
        return decodedJWT;
    }

}

