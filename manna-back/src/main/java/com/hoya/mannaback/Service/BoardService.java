package com.hoya.mannaback.Service;

import java.util.ArrayList;
import java.util.List;

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

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private ImageRepository imageRepository;

    // dto를 받아서 Board 엔터티에 저장하고, 그 엔터티를 저장한다.
    public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto) {
        try {

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

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PostBoardResponseDto.success();
    }

}
