package com.hoya.mannaback.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoya.mannaback.Service.BoardService;
import com.hoya.mannaback.dto.request.PostBoardRequestDto;
import com.hoya.mannaback.dto.response.PostBoardResponseDto;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/board")
@AllArgsConstructor
public class BoardController {

    @Autowired
    private final BoardService boardService;

    @PostMapping("/post")
    public ResponseEntity<? super PostBoardResponseDto> postBoard(
            @RequestBody @Valid PostBoardRequestDto requestBody) {
        ResponseEntity<? super PostBoardResponseDto> response = boardService.postBoard(requestBody);
        return response;
    }

}
