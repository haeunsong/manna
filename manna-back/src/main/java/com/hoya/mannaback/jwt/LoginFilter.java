package com.hoya.mannaback.jwt;

import java.util.Collection;
import java.util.Iterator;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hoya.mannaback.model.request.user.CustomUserDetails;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/*
 * 로그인 검증을 위한 커스텀 UsernamePasswordAuthenticationFilter 작성
 */
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    // 생성자 주입방식
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

        // 클라이언트 요청에서 username, password 추출
        String username = obtainUsername(request);
        String password = obtainPassword(request);

        // 스프링 시큐리티에서 username과 password를 검증하기 위해서는 token에 담아야 함
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password,
                null);

        // token에 담은 검증을 위한 AuthenticationManager로 전달
        return authenticationManager.authenticate(authToken);

    }

    // 로그인 성공시 실행하는 메소드 (로그인 성공시 JWT를 발급)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authentication) {
        // 유저 객체를 알아내기 위해
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        // username 뽑아내기
        String username = customUserDetails.getUsername();

        // role 값 뽑아내기
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();

        // 토큰 받아오기
        String token = jwtUtil.createJwt(username, username, 60 * 60 * 10L);
        response.addHeader("Authorization", "Bearer " + token);
    }
    // 그러면 이제 로그인 하면 응답 헤더에 jwt 토큰이 발급된 것을 확인할 수 있다.

    // 로그인 실패시 실행하는 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) {

        response.setStatus(401);

    }
}
