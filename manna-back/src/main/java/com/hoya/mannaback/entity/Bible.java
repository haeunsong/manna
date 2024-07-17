package com.hoya.mannaback.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Bible {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    int cate;
    int book; // 창(1), 출(2) ...
    int chapter; // 장
    int paragraph; // 절
    String sentence;
    String testament;
    String longLabel;
    String shortLabel;

}
