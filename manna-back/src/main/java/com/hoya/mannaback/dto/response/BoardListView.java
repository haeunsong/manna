package com.hoya.mannaback.dto.response;

import com.hoya.mannaback.entity.Image;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class BoardListView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int boardNumber;

    String title;
    String content;
    String titleImage; // 타이틀 이미지

    String writeDatetime;
    String writerNickname;

}
