package com.Casinop2p.Api;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class FootballApiService {
    private final RestTemplate restTemplate;
    private final String apiToken;

    public FootballApiService(RestTemplate restTemplate, @Value("${api.football.token}") String apiToken) {
        this.restTemplate = restTemplate;
        this.apiToken = apiToken;
    }

    public Match[] getMatches() {

        String url = "https://api.football-data.org/v4/matches";

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Auth-Token", apiToken);  // Añade el token de autenticación

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<Match[]> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    Match[].class
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            } else {
                throw new RuntimeException("Error: " + response.getStatusCode());
            }
        } catch (HttpClientErrorException e) {
            throw new RuntimeException("Error al obtener los partidos: " + e.getStatusCode(), e);
        }
    }
}







