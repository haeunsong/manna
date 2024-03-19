package com.hoya.mannaback.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int sequence;

    int boardNumber;
    String imageUrl;

    public Image(int boardNumber, String imageUrl) {
        this.boardNumber = boardNumber;
        this.imageUrl = imageUrl;
    }

}
