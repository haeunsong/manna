package com.hoya.mannaback.model.response;

import org.eclipse.angus.mail.imap.protocol.ID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hoya.mannaback.common.ResponseCode;
import com.hoya.mannaback.common.ResponseMessage;

import lombok.Getter;

@Getter
public class SignUpResponseDto extends ResponseDto {

    public SignUpResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

    }

    public static ResponseEntity<SignUpResponseDto> success() {
        SignUpResponseDto result = new SignUpResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> fail() {
        ResponseDto result = new ResponseDto(ResponseCode.DATABASE_ERROR,
                ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    public static ResponseEntity<ResponseDto> duplicateEmail() {
        ResponseDto result = new ResponseDto(ResponseCode.DUPLICATE_EMAIL,
                ResponseMessage.DUPLICATE_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

}
