package com.hoya.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hoya.mannaback.dto.request.PostBoardRequestDto;
import com.hoya.mannaback.dto.response.PostBoardResponseDto;
import com.hoya.mannaback.dto.response.ResponseDto;
import com.hoya.mannaback.entity.Board;
import com.hoya.mannaback.entity.Image;
import com.hoya.mannaback.repository.BoardRepository;
import com.hoya.mannaback.repository.ImageRepository;

import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class BoardService {

    @Autowired
    private final BoardRepository boardRepository;
    @Autowired
    private final ImageRepository imageRepository;

    public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto) {
        try {
            // auth 기능 없이 게시물 작성시에 닉네임 기재

            Board board = new Board(dto);
            boardRepository.save(board);

            int boardNumber = board.getBoardNumber();

            List<String> boardImageList = dto.getBoardImageList();
            List<Image> images = new ArrayList<>();

            for (String imageUrl : boardImageList) {
                Image image = new Image(boardNumber, imageUrl);
                images.add(image);
            }
            imageRepository.saveAll(images);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PostBoardResponseDto.success();
    }

}
