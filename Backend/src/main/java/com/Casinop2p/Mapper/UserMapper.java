package com.Casinop2p.Mapper;

import com.Casinop2p.dto.UserDTOReq;
import com.Casinop2p.dto.UserDTORes;
import com.Casinop2p.dto.UserDTOWithoutBalance;
import com.Casinop2p.entity.UserEntity;
import com.Casinop2p.util.UserEnum;

public class UserMapper {

    public static UserDTOWithoutBalance toDTOWithoutBalance(UserEntity userEntity, String betTeam) {
        return UserDTOWithoutBalance.builder()
                .id(userEntity.getId())
                .name(userEntity.getName())
                .email(userEntity.getEmail())
                .userEnum(userEntity.getUserEnum().toString())
                .profileImage(userEntity.getProfileImage())
                .betTeam(betTeam)
                .build();
    }

    public static UserDTORes toDTOWithBetTeam(UserEntity userEntity, String betTeam) {
        return UserDTORes.builder()
                .id(userEntity.getId())
                .name(userEntity.getName())
                .email(userEntity.getEmail())
                .userEnum(userEntity.getUserEnum().toString())
                .profileImage(userEntity.getProfileImage())
                .betTeam(betTeam)
                .build();
    }

    public static UserDTORes toDTO(UserEntity userEntity) {
        return UserDTORes.builder()
                .id(userEntity.getId())
                .name(userEntity.getName())
                .balance(userEntity.getBalance())
                .email(userEntity.getEmail())
                .userEnum(userEntity.getUserEnum().toString())
                .profileImage(userEntity.getProfileImage())
                .betTeam(null)
                .build();
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


