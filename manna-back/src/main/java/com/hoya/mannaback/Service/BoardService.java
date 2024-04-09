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
import com.hoya.mannaback.dto.response.BoardListView;
import com.hoya.mannaback.dto.response.GetBoardResponseDto;

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

    // 최근 작성된 순으로 전체 게시글 불러오기
    public List<BoardListView> getAllPosts() {
        List<Board> boards = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "writeDatetime"));
        List<BoardListView> boardListViews = new ArrayList<>();
        for (Board board : boards) {
            BoardListView boardListView = new BoardListView();
            boardListView.setBoardNumber(board.getBoardNumber());
            boardListView.setTitle(board.getTitle());
            boardListView.setContent(board.getContent());
            boardListView.setWriteDatetime(board.getWriteDatetime());
            boardListView.setWriterNickname(board.getWriterNickname());

            System.out.println("==================================");
            if (board.getTitleImage() != null) {
                System.out.println("타이틀 이미지가 존재합니다.");
                boardListView.setTitleImage(board.getTitleImage().getImageUrl());
            } else {
                System.out.println("타이틀 이미지가 없습니다.");
            }
            boardListViews.add(boardListView);

        }
        return boardListViews;
    }

    // 특정 게시물 불러오기
    public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {

        Board board = null;
        List<Image> images = new ArrayList<>();

        try {
            board = boardRepository.getByBoardNumber(boardNumber);
            if (board == null)
                return GetBoardResponseDto.noExistBoard();

            images = imageRepository.findByBoard_BoardNumber(boardNumber);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return GetBoardResponseDto.success(board, images);

    }

    // 게시물 등록하기
    /*
     * ===== PostBoardRequestDto =====
     * private String title;
     * private String content;
     * private String writerNickname;
     * private List<String> boardImageList = new ArrayList<>();
     * 
     */
    public ResponseEntity<? super PostBoardResponseDto> postBoard(@Valid PostBoardRequestDto dto) {
        try {
            // auth 기능 없이 게시물 작성시에 닉네임 기재
            // board 만들어서 db에 저장
            Board board = new Board(dto);

            // // int boardNumber = board.getBoardNumber();
            // List<String> boardImageList = dto.getBoardImageList();
            // List<Image> images = new ArrayList<>();

            // 이미지 저장
            List<Image> images = new ArrayList<>();
            for (String imageUrl : dto.getBoardImageList()) {
                Image image = new Image(board, imageUrl);
                images.add(image);
            }

            board.setImages(images);
            // imageRepository.saveAll(images);

            // 이미지 저장 후, 대표 이미지 설정
            if (!images.isEmpty()) {
                board.setTitleImage(images.get(0));
            }
            boardRepository.save(board);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PostBoardResponseDto.success();
    }

}
