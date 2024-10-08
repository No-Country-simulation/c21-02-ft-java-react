package com.Casinop2p.service;

import com.Casinop2p.Mapper.UserMapper;
import com.Casinop2p.dto.UserDTOReq;
import com.Casinop2p.dto.UserDTORes;
<<<<<<< HEAD
import com.Casinop2p.entity.UserEntity;
=======
>>>>>>> fd7e6a9744ab5d895779b5e2a23a78711cf8e19b
import com.Casinop2p.exceptions.NotFoundException;
import com.Casinop2p.repository.UserRepository;
import com.Casinop2p.util.UserEnum;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImp  implements UserService{

    private final UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;  // Para convertir entre entidades y DTOs

    @Override
    public UserDTORes getUser(Long id) {

        return UserMapper.toDTO(userRepository.findById(id).orElseThrow(()->new NotFoundException("no se encontro usuario")));
    }


        public UserDTORes createUser(UserDTOReq userDTOReq) {
            UserEntity user = modelMapper.map(userDTOReq, UserEntity.class);  // Convierte DTO a entidad
            user = userRepository.save(user);
            return modelMapper.map(user, UserDTORes.class);  // Convierte entidad a DTO de respuesta
        }

        public UserDTORes getUserById(Long id) {
            UserEntity user = userRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("El usuario con ID: " + id +"no fue encontrado"));
            return modelMapper.map(user, UserDTORes.class);
        }

        public UserDTORes updateUser(Long id, UserDTOReq userDTOReq) {
            UserEntity existingUser = userRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("El usuario con ID: " + id +"no fue encontrado"));

            existingUser.setName(userDTOReq.name());
            existingUser.setPassword(userDTOReq.password());
            existingUser.setBalance(userDTOReq.balance());
            existingUser.setEmail(userDTOReq.email());
            existingUser.setUserEnum(UserEnum.valueOf(userDTOReq.userEnum()));

            existingUser = userRepository.save(existingUser);
            return modelMapper.map(existingUser, UserDTORes.class);
        }

        public void deleteUser(Long id) {
            UserEntity user = userRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("El usuario con ID: " + id +"no fue encontrado"));
            userRepository.delete(user);
        }

        public List<UserDTORes> getAllUsers() {
            List<UserEntity> users = userRepository.findAll();
            return users.stream()
                    .map(user -> modelMapper.map(user, UserDTORes.class))
                    .collect(Collectors.toList());
        }
    }


