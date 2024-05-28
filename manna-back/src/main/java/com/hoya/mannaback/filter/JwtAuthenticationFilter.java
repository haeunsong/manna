package com.hoya.mannaback.filter;

import java.io.IOException;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.hoya.mannaback.provider.JwtProvider;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// 요청을 필터링하여 JWT 토큰을 검증하는 역할을 한다.
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    public JwtAuthenticationFilter(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    // 요청의 헤더에서 Authorization 헤더를 읽어 Bearer 토큰을 추출한다.
    private String parseBearerToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        boolean hasAuthorization = StringUtils.hasText(authorization);
        if (!hasAuthorization)
            return null;

        boolean isBearer = authorization.startsWith("Bearer ");
        if (!isBearer)
            return null;

        String token = authorization.substring(7);
        return token;

    }

    /*
     * controller 에 들어오기 전에 필터에서 거친다. 필터에서 Jwt 검증하고, subject 에서 email 을 꺼낸다.
     * 외부의 컨텍스트에 이메일을 담아놓고 언제든지 꺼내서 사용한다.
     */
    // 각 요청에 대해 JWT 토큰을 검증하고, 유효한 경우 해당 사용자를 인증
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            String token = parseBearerToken(request);
            if (token == null) {
                filterChain.doFilter(request, response);
                return;
            }

            String email = jwtProvider.validate(token);
            if (email == null) {
                filterChain.doFilter(request, response);
                return;
            }

            AbstractAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, null,
                    AuthorityUtils.NO_AUTHORITIES);

            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            securityContext.setAuthentication(authenticationToken);

            SecurityContextHolder.setContext(securityContext);
            System.out.println("Authenticated user: " + email); // 디버깅 로그 추가
        } catch (Exception e) {
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }

}
