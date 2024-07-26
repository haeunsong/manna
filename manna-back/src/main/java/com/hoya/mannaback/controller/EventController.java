package com.hoya.mannaback.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoya.mannaback.Service.EventService;
import com.hoya.mannaback.entity.Event;
import com.hoya.mannaback.model.request.PostEventRequestDto;
import com.hoya.mannaback.model.response.PostEventResponseDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
@RestController
@RequestMapping("/api/v1/event")
@CrossOrigin
public class EventController {

    @Autowired
    private EventService eventService;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final Logger LOGGER = LoggerFactory.getLogger(EventController.class);

    // 특정 날짜에 해당하는 이벤트 목록 불러오기
    @GetMapping("/{date}")
    public List<Event> getEventByDate(@PathVariable String date) {
        try {
            LOGGER.info("Received date string: " + date);
            // 문자열 양 끝의 공백 제거
            date = date.trim();
            LOGGER.info("Trimmed date string: " + date);
            // 날짜 파싱
            LocalDate localDate = LocalDate.parse(date, DATE_FORMATTER);
            return eventService.getEventsByDate(localDate);
        } catch (DateTimeParseException e) {
            LOGGER.error("Invalid date format: " + date, e);
            throw new IllegalArgumentException("Invalid date format: " + date, e);
        }
    }

    // 일정 추가하기
    @PostMapping("/post")
    public ResponseEntity<? super PostEventResponseDto> createEvent(@RequestBody PostEventRequestDto event) {
        ResponseEntity<? super PostEventResponseDto> response = eventService.createEvent(event);
        return response;
    }
}
