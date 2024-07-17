package com.hoya.mannaback.config;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hoya.mannaback.filter.JwtAuthenticationFilter;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

        private final JwtAuthenticationFilter jwtAuthenticationFilter;

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

                // csrf disable
                http
                                .csrf((auth) -> auth.disable());

                // http basic 인증 방식 disable
                http
                                .httpBasic((auth) -> auth.disable());

                // 경로별 인가 작업
                http
                                .authorizeHttpRequests(auth -> {
                                        try {
                                                auth.requestMatchers(HttpMethod.GET, "/", "/api/v1/board/list",
                                                                "/api/v1/board/detail/**", "/file/**",
                                                                "/api/v1/user/**", "/api/v1/board/search-list/**",
                                                                "/api/v1/bible/today-verse/**",
                                                                "/api/v1/bible/read-verse/**")
                                                                .permitAll()
                                                                .requestMatchers(HttpMethod.POST, "/api/v1/board/post",
                                                                                "/api/v1/auth/sign-up",
                                                                                "/api/v1/auth/sign-in",

                                                                                "/file/upload")

                                                                .permitAll()
                                                                // admin 권한이 있는 사용자만 허용되는 요청
                                                                .requestMatchers(HttpMethod.PATCH,
                                                                                "/api/v1/board/update/**")
                                                                .hasRole("ADMIN")
                                                                .requestMatchers(HttpMethod.DELETE,
                                                                                "/api/v1/board/detail/**")
                                                                .hasRole("ADMIN")
                                                                // 나머지 요청은 인증을 필요로 함
                                                                .anyRequest().authenticated().and()
                                                                .exceptionHandling()
                                                                .authenticationEntryPoint(
                                                                                new FailedAuthenticationEntryPoint());

                                        } catch (Exception e) {
                                                e.printStackTrace();
                                        }
                                });

                // 세션 설정
                http
                                .sessionManagement((session) -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

                http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }
}

class FailedAuthenticationEntryPoint implements AuthenticationEntryPoint {

        @Override
        public void commence(HttpServletRequest request, HttpServletResponse response,
                        AuthenticationException authException) throws IOException, ServletException {

                response.setContentType("application/json");
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write("{ \"code\": \"NP\", \"message\":\"Do not have a permission.\" }");

        }

}