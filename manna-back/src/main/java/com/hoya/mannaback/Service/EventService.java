package com.hoya.mannaback.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoya.mannaback.entity.Event;
import com.hoya.mannaback.repository.EventRepository;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getEventsByDate(LocalDate date) {
        return eventRepository.findByDate(date);
    }

}
