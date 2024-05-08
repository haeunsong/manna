package com.hoya.mannaback.Service.user;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hoya.mannaback.entity.User;
import com.hoya.mannaback.model.request.user.CustomUserDetails;
import com.hoya.mannaback.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    // DB 에 접근 가능한 userRepository
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomUserDetailsService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userData = userRepository.findByUsername(username);
        if (userData != null) {
            // UserDetails에 담아서 return하면 AutneticationManager가 검증 함
            return new CustomUserDetails(userData);
        }
        throw new UsernameNotFoundException("User not found with username: " + username);

    }

}
