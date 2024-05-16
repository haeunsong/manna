package com.hoya.mannaback.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/board")
public class AdminController {

    @GetMapping("admin/index")
    public String adminP() {
        return "admin";
    }

}
