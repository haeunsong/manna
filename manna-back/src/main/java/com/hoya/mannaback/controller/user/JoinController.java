package com.hoya.mannaback.controller.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hoya.mannaback.Service.user.JoinService;
import com.hoya.mannaback.dto.request.user.JoinDto;

@Controller
@ResponseBody
public class JoinController {

    private final JoinService joinService;

    public JoinController(JoinService joinService) {
        this.joinService = joinService;
    }

    @PostMapping("/join")
    public String joinProcess(JoinDto joinDto) {
        System.out.println(joinDto.getUsername());
        joinService.joinProcess(joinDto);

        return "OK";
    }

}
