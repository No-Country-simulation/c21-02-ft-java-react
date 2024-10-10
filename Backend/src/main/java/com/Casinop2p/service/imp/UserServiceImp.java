package com.Casinop2p.service.imp;

import com.Casinop2p.Mapper.UserMapper;
import com.Casinop2p.dto.UserDTOReq;
import com.Casinop2p.dto.UserDTORes;
import com.Casinop2p.entity.UserEntity;
import com.Casinop2p.exceptions.NotFoundException;
import com.Casinop2p.repository.UserRepository;
import com.Casinop2p.service.UserService;
import com.Casinop2p.util.UserEnum;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;  // Para convertir entre entidades y DTOs

    @Override
    public UserDTORes getUser(Long id) {

        return UserMapper.toDTO(userRepository.findById(id).orElseThrow(() -> new NotFoundException("no se encontro usuario")));
    }


    @Override
    public UserDTORes createUser(UserDTOReq userDTOReq) {
        UserEntity user = UserMapper.toUserEntity(userDTOReq);

        // Asegúrate de que estás codificando la contraseña
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user = userRepository.save(user);
        return UserMapper.toDTO(user);
    }

    public UserDTORes getUserById(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("El usuario con ID: " + id + "no fue encontrado"));
        return UserMapper.toDTO(user);
    }

    public UserDTORes updateUser(Long id, UserDTOReq userDTOReq) {
        UserEntity existingUser = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("El usuario con ID: " + id + "no fue encontrado"));

        existingUser.setName(userDTOReq.name());
        existingUser.setPassword(userDTOReq.password());
        existingUser.setBalance(userDTOReq.balance());
        existingUser.setEmail(userDTOReq.email());
        existingUser.setUserEnum(UserEnum.valueOf(userDTOReq.userEnum()));

        existingUser = userRepository.save(existingUser);
        return UserMapper.toDTO(existingUser);
    }

    public void deleteUser(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("El usuario con ID: " + id + "no fue encontrado"));
        userRepository.delete(user);
    }

    public List<UserDTORes> getAllUsers() {
        List<UserEntity> users = userRepository.findAll();
        return users.stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }


}


