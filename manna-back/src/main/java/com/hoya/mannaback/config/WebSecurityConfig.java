// package com.hoya.mannaback.config;

// import java.io.IOException;

// import org.springframework.beans.factory.annotation.Configurable;
// import org.springframework.context.annotation.Bean;
// import org.springframework.http.HttpMethod;
// import
// org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import
// org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.core.AuthenticationException;
// import org.springframework.security.web.AuthenticationEntryPoint;
// import org.springframework.security.web.SecurityFilterChain;
// import
// org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// import com.hoya.mannaback.filter.JwtAuthenticationFilter;

// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// @Configurable
// @EnableWebSecurity
// public class WebSecurityConfig {

// private final JwtAuthenticationFilter jwtAuthenticationFilter;

// public WebSecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
// this.jwtAuthenticationFilter = jwtAuthenticationFilter;
// }

// @Bean
// SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
// httpSecurity.cors().and()
// .csrf().disable()
// .httpBasic().disable()
// .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
// .authorizeHttpRequests((requests) -> {
// try {
// requests
// .requestMatchers("/", "/api/v1/auth/**", "/api/v1/search/**", "/file/**",
// "/api/v1/board/detail/*",
// "/api/v1/board/post")
// .permitAll()
// .requestMatchers(HttpMethod.GET, "/api/v1/board/**").permitAll()
// .anyRequest().authenticated().and()
// .exceptionHandling().authenticationEntryPoint(new
// FailedAuthenticationEntryPoint());
// } catch (Exception e) {

// e.printStackTrace();
// }
// });

// httpSecurity.addFilterBefore(jwtAuthenticationFilter,
// UsernamePasswordAuthenticationFilter.class);

// return httpSecurity.build();
// }
// }

// class FailedAuthenticationEntryPoint implements AuthenticationEntryPoint {

// @Override
// public void commence(HttpServletRequest request, HttpServletResponse
// response,
// AuthenticationException authException) throws IOException, ServletException {

// response.setContentType("application/json");
// response.setStatus(HttpServletResponse.SC_FORBIDDEN);
// response.getWriter().write("{ \"code\": \"NP\", \"message\":\"Do not have a
// permission.\" }");

// }

// }
