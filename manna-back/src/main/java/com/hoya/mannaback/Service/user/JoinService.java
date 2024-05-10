package com.hoya.mannaback.Service.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hoya.mannaback.entity.User;
import com.hoya.mannaback.dto.request.user.JoinDto;
import com.hoya.mannaback.repository.UserRepository;

@Service
public class JoinService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public JoinService(UserRepository userRepository, PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void joinProcess(JoinDto joinDto) {
        String username = joinDto.getUsername();
        String password = joinDto.getPassword();
        Boolean isExist = userRepository.existsByUsername(username);

        if (isExist) {
            return;
        }

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setRole("ROLE_ADMIN");

        userRepository.save(newUser);

    }
}
