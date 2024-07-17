package com.hoya.mannaback.model.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hoya.mannaback.common.ResponseCode;
import com.hoya.mannaback.common.ResponseMessage;

import lombok.Getter;

@Getter
public class GetReadVerseResponseDto extends ResponseDto {

    public GetReadVerseResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<GetReadVerseResponseDto> success() {
        GetReadVerseResponseDto result = new GetReadVerseResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}
