package com.hoya.mannaback.provider;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;

@Component
public class JwtProvider {

    @Value("${secret-key}")
    private String secretKey;

    public String create(String email, String role) {
        ZonedDateTime expiredDate = LocalDateTime.now().plusYears(3).atZone(ZoneId.systemDefault());
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role); // 역할 정보를 claims에 추가

        String jwt = Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(Date.from(expiredDate.toInstant()))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        System.out.println("Created JWT: " + jwt);
        return jwt;
    }

    // 검증
    public Claims validate(String jwt) {
        try {
            return Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(jwt)
                    .getBody();
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }
    }
}
