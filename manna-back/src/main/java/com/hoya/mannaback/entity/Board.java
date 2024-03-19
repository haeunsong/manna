package com.hoya.mannaback.entity;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

import com.hoya.mannaback.dto.request.PostBoardRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int boardNumber;

    String title;
    String content;
    String writeDatetime;
    String writerNickname;

    @ManyToOne
    @JoinColumn(name = "sequence")
    Image image;

    public Board(PostBoardRequestDto dto) {

        Date now = Date.from(Instant.now());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        // now 에 저장된 날짜와 시간을 형식화하여 문자열로 반환한다.
        String writeDatetime = simpleDateFormat.format(now);

        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.writerNickname = dto.getWriterNickname();
        this.writeDatetime = writeDatetime;

    }

}
