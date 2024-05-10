package com.hoya.mannaback.jwt;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import com.hoya.mannaback.dto.request.user.CustomUserDetails;
import com.hoya.mannaback.entity.User;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTFilter extends OncePerRequestFilter {

    /*
     * jwt를 request 에서 뽑아내서 검증을 진행한다.
     * JWTUtil 을 주입받고
     */

    private final JWTUtil jwtUtil;

    public JWTFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // request 에서 Authorization 헤더를 찾음
        String authorization = request.getHeader("Authorization");
        // Authorization 헤더 검증
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            System.out.println("token null");
            filterChain.doFilter(request, response);

            // 조건이 해당되면 메소드 종료(필수)
            return;
        }

        // Bearer부분 제거 후 순수 토큰 제거
        String token = authorization.split(" ")[1];

        // 토큰 소멸 시간 검증
        if (jwtUtil.isExpired(token)) {
            System.out.println("token expired");
            // 그 다음 필터에게 넘겨주는 작업
            filterChain.doFilter(request, response);

            // 조건이 해당되면 메소드 종료(필수)
            return;
        }
        // 토큰에서 username 과 role 획득
        String username = jwtUtil.getUsername(token);
        String role = jwtUtil.getRole(token);

        // user 엔터티를 생성하여 값 set
        User user = new User();
        user.setUsername(username);
        // 비밀번호는 토큰에 담기지 않았지만 임시적으로 초기화를 해주자.
        user.setPassword("temppassword");
        user.setRole(role);

        // UserDetails 에 회원 정보 객체 담기
        CustomUserDetails customUserDetails = new CustomUserDetails(user);

        // 스프링 시큐리티 인증 토큰 생성
        // Authentication authToken = new
        // UsernamePasswordAuthenticationToken(customUserDetails, null,
        // customUserDetails.getAuthorities());

    }

}
