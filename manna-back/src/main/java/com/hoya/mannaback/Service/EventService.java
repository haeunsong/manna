package com.hoya.mannaback.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hoya.mannaback.entity.Event;
import com.hoya.mannaback.model.request.PostEventRequestDto;
import com.hoya.mannaback.repository.EventRepository;
import com.hoya.mannaback.model.response.PostEventResponseDto;
import com.hoya.mannaback.model.response.ResponseDto;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getEventsByDate(LocalDate date) {
        return eventRepository.findByDate(date);
    }

    /*
     * private String title;
     * private String description;
     * private LocalDate date;
     */
    public ResponseEntity<? super PostEventResponseDto> createEvent(PostEventRequestDto dto) {
        try {
            Event event = new Event(dto);
            eventRepository.save(event);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PostEventResponseDto.success();
    }
}
