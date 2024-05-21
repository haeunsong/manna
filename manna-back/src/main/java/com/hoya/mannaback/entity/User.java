package com.hoya.mannaback.entity;

import com.hoya.mannaback.model.request.SignUpRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
public class User {

    @Id
    String email;
    String password;
    String nickName;
    String userType; // 괸리자 or null

    // user - board 1:N
    // @ManyToOne
    // @JoinColumn(name = "writerEmail")
    // Board board;

    public User(SignUpRequestDto dto) {
        this.email = dto.getEmail();
        this.password = dto.getPassword();
        this.nickName = dto.getNickname();
        this.userType = dto.getUserType();
    }

}
