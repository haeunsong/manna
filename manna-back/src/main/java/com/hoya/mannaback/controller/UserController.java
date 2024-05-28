package com.hoya.mannaback.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoya.mannaback.Service.UserService;
import com.hoya.mannaback.model.response.GetSignInUserResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/index")
    public ResponseEntity<? super GetSignInUserResponseDto> getSiginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = (String) authentication.getPrincipal();
        ResponseEntity<? super GetSignInUserResponseDto> response = userService.getSignInUser(email);
        return response;
    }

    // @GetMapping("/index")
    // public ResponseEntity<? super GetSignInUserResponseDto>
    // getSiginUser(@AuthenticationPrincipal String email) {

    // ResponseEntity<? super GetSignInUserResponseDto> response =
    // userService.getSignInUser(email);
    // return response;
    // }

}
