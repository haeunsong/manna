package com.hoya.mannaback.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class User {
    @Id
    String email;
    String password;
    String nickname;

    // user - board 1:N
    @ManyToOne
    @JoinColumn(name = "writerEmail")
    Board board;

}
