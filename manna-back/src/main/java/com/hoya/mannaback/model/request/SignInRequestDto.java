package com.hoya.mannaback.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignInRequestDto {

    @NotBlank(message = "이메일은 필수 입력 사항입니다.")
    private String email;

    @NotBlank(message = "이메일은 필수 입력 사항입니다.")
    @Size(min = 8, max = 20, message = "패스워드는 최소8자 이상이어야 합니다.")
    private String password;

}
