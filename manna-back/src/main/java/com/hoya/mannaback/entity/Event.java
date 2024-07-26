package com.hoya.mannaback.entity;

import java.time.LocalDate;
import java.util.Date;

import com.hoya.mannaback.model.request.PostEventRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor // 디폴트 생성자 필수!
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String description;
    private LocalDate date;

    public Event(PostEventRequestDto dto) {
        this.title = dto.getTitle();
        this.description = dto.getDescription();
        this.date = dto.getDate();

    }

}
