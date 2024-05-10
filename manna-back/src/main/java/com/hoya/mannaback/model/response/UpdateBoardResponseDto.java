package com.hoya.mannaback.model.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hoya.common.ResponseMessage;
import com.hoya.mannaback.common.ResponseCode;

public class UpdateBoardResponseDto extends ResponseDto {

    public UpdateBoardResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

    }

    public static ResponseEntity<UpdateBoardResponseDto> success() {
        UpdateBoardResponseDto result = new UpdateBoardResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> fail() {
        ResponseDto result = new ResponseDto(ResponseCode.DATABASE_ERROR,
                ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistBoard() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD,
                ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

}
