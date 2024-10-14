package com.Casinop2p.service;


import com.Casinop2p.dto.UserDTOReq;
import com.Casinop2p.dto.UserDTORes;

import java.util.List;

public interface UserService {

    public UserDTORes getUser(Long id);

    UserDTORes createUser(UserDTOReq userDTOReq);

    // Firma del método para obtener un usuario por su ID
    UserDTORes getUserById(Long id);

    // Firma del método para actualizar un usuario
    UserDTORes updateUser(Long id, UserDTOReq userDTOReq);

    // Firma del método para eliminar un usuario por su ID
    void deleteUser(Long id);

    // Firma del método para obtener todos los usuarios
    List<UserDTORes> getAllUsers();

    UserDTORes updateProfileImage(Long id, String imageUrl);


}
