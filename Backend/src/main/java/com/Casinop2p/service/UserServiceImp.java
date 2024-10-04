package com.Casinop2p.service;

import com.Casinop2p.Mapper.UserMapper;
import com.Casinop2p.dto.UserDTOReq;
import com.Casinop2p.dto.UserDTORes;
import com.Casinop2p.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImp  implements UserService{

    private final UserRepository userRepository;

    @Override
    public UserDTORes getUser(Long id) {

        return UserMapper.toDTO(userRepository.findById(id).orElseThrow(()->new RuntimeException("no se encontro usuario")));
    }
}
