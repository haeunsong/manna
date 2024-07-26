package com.hoya.mannaback.model.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hoya.mannaback.common.ResponseCode;
import com.hoya.mannaback.common.ResponseMessage;

public class PostEventResponseDto extends ResponseDto {

    public PostEventResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

    }

    public static ResponseEntity<PostEventResponseDto> success() {
        PostEventResponseDto result = new PostEventResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}
