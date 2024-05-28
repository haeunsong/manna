package com.hoya.mannaback.model.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hoya.mannaback.common.ResponseCode;
import com.hoya.mannaback.common.ResponseMessage;
import com.hoya.mannaback.entity.User;

import lombok.Getter;

@Getter
public class GetSignInUserResponseDto extends ResponseDto {

    private String email;
    private String nickname;
    private String role;

    private GetSignInUserResponseDto(User user) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.email = user.getEmail();
        this.nickname = user.getNickName();
        this.role = user.getRole();
    }

    public static ResponseEntity<GetSignInUserResponseDto> success(User user) {
        GetSignInUserResponseDto result = new GetSignInUserResponseDto(user);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> notExistUser() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }

}
