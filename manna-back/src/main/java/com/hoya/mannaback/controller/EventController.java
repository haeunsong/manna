package com.hoya.mannaback.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoya.mannaback.Service.EventService;
import com.hoya.mannaback.entity.Event;

@Controller
@RestController
@RequestMapping("/api/v1/event")
@CrossOrigin
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/{date}")
    public List<Event> getEventByDate(@PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date); // 문자열을 LocalDate 객체로 변환
        return eventService.getEventsByDate(localDate);
    }

}
