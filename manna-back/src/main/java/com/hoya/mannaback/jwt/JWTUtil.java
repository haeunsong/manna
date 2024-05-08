package com.hoya.mannaback.jwt;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;

/* JWTUtil사용법: LoginFilter 에서 JWTUtil 을 주입받아서 사용할 것이다. 
 * success 함수부분에서 JWT 발급해서 응답시켜주기
*/
@Component
public class JWTUtil {

    // 객체 변수
    private SecretKey secretKey;

    // 받은 시크릿 키를 객체변수로 암호화하기 위한 메소드 구현
    public JWTUtil(@Value("${spring.jwt.secret}") String secret) {
        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8),
                Jwts.SIG.HS256.key().build().getAlgorithm());

    }

    // 검증 진행할 메소드
    public String getUsername(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("username",
                String.class);

    }

    public String getRole(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role",
                String.class);

    }

    public Boolean isExpired(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration()
                .before(new Date());
    }

    // 로그인 성공시 토큰 생성해서 응답해주는 메소드
    public String createJwt(String username, String role, Long expiredMs) {
        return Jwts.builder().claim("username", username).claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration((new Date(System.currentTimeMillis() + expiredMs)))
                .signWith(secretKey)
                .compact();
    }

}
