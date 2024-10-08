package com.Casinop2p.Mapper;

import com.Casinop2p.dto.UserDTORes;
import com.Casinop2p.entity.UserEntity;

public class UserMapper {

    public static UserDTORes toDTO(UserEntity userEntity){
        return new UserDTORes(userEntity.getId(), userEntity.getName(), userEntity.getBalance(), userEntity.getEmail(),userEntity.getUserEnum().toString());
    }
}
