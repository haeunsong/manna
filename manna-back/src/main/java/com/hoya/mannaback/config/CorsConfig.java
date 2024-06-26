package com.hoya.mannaback.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        corsRegistry
                .addMapping("/**")
                // .allowedOrigins("http://localhost:3000")
                // .allowedMethods("OPTIONS", "GET", "POST", "PUT", "DELETE", "PATCH");
                .allowedMethods("*")
                .allowedOrigins("*");
    }

}