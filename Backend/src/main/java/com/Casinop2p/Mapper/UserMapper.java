package com.Casinop2p.Mapper;

import com.Casinop2p.dto.UserDTOReq;
import com.Casinop2p.dto.UserDTORes;
import com.Casinop2p.entity.UserEntity;
import com.Casinop2p.util.UserEnum;

public class UserMapper {


    public static UserDTORes toDTO(UserEntity userEntity) {

        return new UserDTORes(userEntity.getId(), userEntity.getName(), userEntity.getBalance(), userEntity.getEmail(), userEntity.getUserEnum().toString(), userEntity.getProfileImage());

       
    }

    public static UserEntity toUserEntity(UserDTOReq request) {
        UserEnum userEnum = UserEnum.valueOf(request.userEnum());
        return UserEntity.builder()
                .name(request.name())
                .email(request.email())
                .password(request.password())
                .balance(request.balance())
                .userEnum(userEnum)
                .build();
    }

}


