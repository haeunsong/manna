package com.hoya.mannaback.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hoya.mannaback.Service.BoardService;
import com.hoya.mannaback.entity.Board;
import com.hoya.mannaback.model.request.PostBoardRequestDto;
import com.hoya.mannaback.model.request.UpdateBoardRequestDto;
import com.hoya.mannaback.model.response.BoardListView;
import com.hoya.mannaback.model.response.DeleteBoardResponseDto;
import com.hoya.mannaback.model.response.GetBoardResponseDto;
import com.hoya.mannaback.model.response.PostBoardResponseDto;
import com.hoya.mannaback.model.response.UpdateBoardResponseDto;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/board")
@CrossOrigin
public class BoardController {

    @Autowired
    private final BoardService boardService = null;

    @GetMapping("/list")
    public List<BoardListView> getAllPosts() {
        return boardService.getAllPosts();

    }

    @GetMapping("/detail/{boardNumber}")
    public ResponseEntity<? super GetBoardResponseDto> getBoard(@PathVariable("boardNumber") Integer boardNumber) {
        ResponseEntity<? super GetBoardResponseDto> response = boardService.getBoard(boardNumber);
        return response;
    }

    @PostMapping("/post")
    public ResponseEntity<? super PostBoardResponseDto> postBoard(
            @RequestBody @Valid PostBoardRequestDto requestBody) {
        ResponseEntity<? super PostBoardResponseDto> response = boardService.postBoard(requestBody);
        return response;
    }

    @PatchMapping("/update/{boardNumber}")
    public ResponseEntity<? super UpdateBoardResponseDto> updateBoard(
            @RequestBody @Valid UpdateBoardRequestDto requestBody, @PathVariable("boardNumber") Integer boardNumber) {
        ResponseEntity<? super UpdateBoardResponseDto> response = boardService.updateBoard(requestBody, boardNumber);
        return response;

    }

    @DeleteMapping("/detail/{boardNumber}")
    public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(
            @PathVariable("boardNumber") Integer boardNumber) {
        ResponseEntity<? super DeleteBoardResponseDto> response = boardService.deleteBoard(boardNumber);
        return response;
    }
}
