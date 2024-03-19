package com.hoya.mannaback.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int sequence;

    @ManyToOne
    @JoinColumn(name = "boardNumber")
    Board board;

    String imageUrl;

    public Image(Board board, String imageUrl) {
        this.board = board;
        this.imageUrl = imageUrl;
    }

}
