package com.hoya.mannaback.Service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hoya.mannaback.dto.request.PostBoardRequestDto;
import com.hoya.mannaback.dto.response.PostBoardResponseDto;
import com.hoya.mannaback.dto.response.ResponseDto;
import com.hoya.mannaback.entity.Board;
import com.hoya.mannaback.entity.Image;
import com.hoya.mannaback.repository.BoardRepository;
import com.hoya.mannaback.repository.ImageRepository;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;
    // ModelMapper modelMapper = new ModelMapper();

    // 최근 작성된 순으로 게시글 불러오기
    public List<Board> getAllPosts() {
        return boardRepository.findAll(Sort.by(Sort.Direction.DESC, "writeDatetime"));
    }

    public ResponseEntity<? super PostBoardResponseDto> postBoard(@Valid PostBoardRequestDto dto) {
        try {
            // auth 기능 없이 게시물 작성시에 닉네임 기재

            // board 만들어서 db에 저장
            Board board = new Board(dto);
            boardRepository.save(board);
            System.out.println("글 저장완료");
            // // int boardNumber = board.getBoardNumber();
            // List<String> boardImageList = dto.getBoardImageList();
            // List<Image> images = new ArrayList<>();

            List<Image> images = new ArrayList<>();

            for (String imageUrl : dto.getBoardImageList()) {
                Image image = new Image(board, imageUrl);
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
