package com.hoya.mannaback.model.request;

import java.time.LocalDate;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// EventService 의 createEvent 함수에서 새로운 Event 객체를 만들어 db에 저장하기 때문에 Getter 가 필요하다.
//  Event event = new Event(dto); 이런식으로 사용됨
@Getter
public class PostEventRequestDto {
    private String title;
    private String description;
    private LocalDate date;

}
