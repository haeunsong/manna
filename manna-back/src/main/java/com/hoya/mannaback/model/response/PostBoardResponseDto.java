package com.hoya.mannaback.model.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hoya.mannaback.common.ResponseCode;
import com.hoya.mannaback.common.ResponseMessage;

import lombok.Getter;

@Getter
public class PostBoardResponseDto extends ResponseDto {

    private PostBoardResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

    }

    public static ResponseEntity<PostBoardResponseDto> success() {
        PostBoardResponseDto result = new PostBoardResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}
