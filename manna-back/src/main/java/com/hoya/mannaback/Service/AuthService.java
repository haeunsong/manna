package com.hoya.mannaback.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hoya.mannaback.entity.User;
import com.hoya.mannaback.model.request.SignInRequestDto;
import com.hoya.mannaback.model.request.SignUpRequestDto;
import com.hoya.mannaback.model.response.ResponseDto;
import com.hoya.mannaback.model.response.SignUpResponseDto;
import com.hoya.mannaback.provider.JwtProvider;
import com.hoya.mannaback.model.response.SignInResponseDto;
import com.hoya.mannaback.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    // final 로 지정된 얘들을 @RequiredArgsConstructor 가 알아서 의존성 주입을 알아서 해준다.
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 회원가입
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
        try {

            // 이메일 중복 체크
            String email = dto.getEmail();
            if (userRepository.existsByEmail(email)) {
                return SignUpResponseDto.duplicateEmail();
            }

            // dto 에 암호화된 password 를 넣는다.
            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            // 새로운 user 에 dto 정보를 저장한다.
            User newUser = new User(dto);
            userRepository.save(newUser);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignUpResponseDto.success();
    }

    // 로그인
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {

        String token = null;

        try {
            // 해당 이메일로 유저를 찾아오고
            String email = dto.getEmail();

            User user = userRepository.findByEmail(email);
            if (user == null)
                return SignInResponseDto.signInFailed();

            String password = dto.getPassword();
            String encodedPassword = user.getPassword();
            // 사용자가 입력한 패스워드와, db에 저장되어 있는 암호화된 패스워드가 일치한지 확인한다.
            boolean isMatched = passwordEncoder.matches(password, encodedPassword);
            if (!isMatched)
                return SignInResponseDto.signInFailed();

            // 토큰 생성
            token = jwtProvider.create(email, "ROLE_ADMIN");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignInResponseDto.success(token);

    }
}
