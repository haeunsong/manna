package com.hoya.mannaback.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // 권한 설정 시작
        http.authorizeHttpRequests((requests) -> requests
                .requestMatchers("/admin/**").hasRole("ADMIN") // '/admin/**' 패턴의 URL은 ROLE_ADMIN 권한을 가진 사용자만 요청 가능.
                .anyRequest().permitAll() // 그 외 나머지 URL 은 아무나 접근할 수 있다.
        )

                // 로그인 페이지 설정 시작
                .formLogin((form) -> form
                        .loginPage("/login") // 로그인 페이지 URL 설정. 이 URL 의 액션 메소드와 뷰 파일 구현해야 한다.
                        .loginProcessingUrl("/login_processing") // 로그인 페이지에서 '로그인' 버튼을 눌렀을 때 요청한 url 설정
                        .failureUrl("/login?error") // 로그인이 실패했을 때 (로그인 아이디, 비밀번호가 일치하지 않았을 때) 넘어갈(redirect) URL 설정이다
                        /*
                         * 로그인이 성공했을 때 넘어갈(redirect) URL 설정이다.
                         * 둘째 파라미터가 false 이면, 로그인 하기 직전에 방문하려던 페이지가 있으면 그 페이지로 넘어가고
                         * 방문하려던 페이지가 없을 때만, 첫째 파라미터 URL로 넘어간다.
                         * 둘째 파라미터가 true 이면, 무조건 첫째 파라미터 URL로 넘어간다.
                         * 
                         */
                        .defaultSuccessUrl("/", true)

                        /*
                         * 로그인 페이지 (뷰 파일)에서 로그인 아이디 input 태그의 name 값과, 비밀번호 input 태그의 name 값 설정이다.
                         */
                        .usernameParameter("loginName")
                        .passwordParameter("passwd")
                        .permitAll())
                .logout((logout) -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout_processing")) // 로그아웃 버튼이나 링크를 눌렀을 때
                                                                                               // 요청할 URL 설정. 이 URL이
                                                                                               // 요청되면, 로그아웃 절차는 spring
                                                                                               // security 엔진에 의해서 자동으로
                                                                                               // 진행된다.
                        .logoutSuccessUrl("/login") // 로그아웃 된 후 넘어갈 URL 설정
                        .invalidateHttpSession(true) // 로그아웃 될 때 세션에 들어있는 데이터를 전부 지우라는 설정
                        .permitAll());
        return http.build();
    }

    /*
     * 비밀번호 인코딩 객체를 생성해서 리턴하는 메소드
     * 이 프로젝트의 다른 클래스에서 @Autowired PasswordEncoder passwordEncoder 선언이 있으면
     * 이 메소드가 리턴하는 객체가 자동주입된다.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}