package com.hoya.mannaback.Service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hoya.mannaback.entity.User;
import com.hoya.mannaback.model.response.GetSignInUserResponseDto;
import com.hoya.mannaback.model.response.ResponseDto;
import com.hoya.mannaback.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {
        User user;
        try {
            user = userRepository.findByEmail(email);
            System.out.println("Fetched user: " + user); // 디버깅 로그 추가
            if (user == null)
                return GetSignInUserResponseDto.notExistUser();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetSignInUserResponseDto.success(user);
    }

}
