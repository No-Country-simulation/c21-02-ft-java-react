package com.Casinop2p.service;

import com.Casinop2p.entity.BetEntity;
import com.Casinop2p.repository.BetRepository;
import com.Casinop2p.repository.RoomRepository;
import com.Casinop2p.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BetService {

    @Autowired
    private BetRepository betRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoomRepository roomRepository;

    public List<BetEntity> getAllBets() { //obtener listado
        return betRepository.findAll();
    }

    public BetEntity getBetById(Long id) {
        Optional<BetEntity> bet = betRepository.findById(id);// obtener por id
        return bet.orElse(null);
    }

    //este metodo se deberia invocar  al momento de que el jugador se una a la sala
    public BetEntity createBet(Long idUser,Long idRoom) {

        BetEntity bet = new BetEntity();

       //asignar usuario a su apuesta
        bet.setUser(userRepository.findById(idUser).orElseThrow(() -> new RuntimeException("user not found")));

        // Asignar la sala
        bet.setRoom(roomRepository.findById(idRoom).orElseThrow(() -> new RuntimeException("user not found")));

        /*===========campos a futuro=============
        // La predicción del jugador
        bet.setBetPrediction(betPrediction);


        bet.setBetWon(false); //apuesta ganada?
        bet.setPayout(0); //ganancia de  la apuesta

         */
        
        return bet;
    }


}
