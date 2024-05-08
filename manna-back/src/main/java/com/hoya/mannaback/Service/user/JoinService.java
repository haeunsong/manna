package com.hoya.mannaback.Service.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.hoya.mannaback.entity.User;
import com.hoya.mannaback.model.request.user.JoinDto;
import com.hoya.mannaback.repository.UserRepository;

@Service
public class JoinService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public JoinService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {

        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
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
        newUser.setPassword(bCryptPasswordEncoder.encode(password));
        newUser.setRole("ROLE_ADMIN");

        userRepository.save(newUser);

    }
}
