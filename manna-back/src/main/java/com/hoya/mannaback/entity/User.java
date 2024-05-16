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
    int id;
    String loginName;
    String password;
    String name;

    boolean enabled;
    String userType; // 괸리자 or

    // user - board 1:N
    // @ManyToOne
    // @JoinColumn(name = "writerEmail")
    // Board board;

}
