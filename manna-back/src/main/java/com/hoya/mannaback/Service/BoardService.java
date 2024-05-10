package com.hoya.mannaback.Service;

import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hoya.mannaback.entity.Board;
import com.hoya.mannaback.entity.Image;
import com.hoya.mannaback.model.request.UpdateBoardRequestDto;
import com.hoya.mannaback.model.response.UpdateBoardResponseDto;
import com.hoya.mannaback.model.request.PostBoardRequestDto;
import com.hoya.mannaback.model.response.BoardListView;
import com.hoya.mannaback.model.response.DeleteBoardResponseDto;
import com.hoya.mannaback.model.response.GetBoardResponseDto;
import com.hoya.mannaback.model.response.PostBoardResponseDto;
import com.hoya.mannaback.model.response.ResponseDto;
import com.hoya.mannaback.repository.BoardRepository;
import com.hoya.mannaback.repository.ImageRepository;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;
    // ModelMapper modelMapper = new ModelMapper();

    // 최근 작성된 순으로 전체 게시글 불러오기
    public List<BoardListView> getAllPosts() {
        List<Board> boards = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "writeDatetime"));

        List<BoardListView> boardListViews = new ArrayList<>();

        // 받아온 boards를 boardListView 형식으로 옮기기
        for (Board board : boards) {
            BoardListView boardListView = new BoardListView();
            boardListView.setBoardNumber(board.getBoardNumber());
            boardListView.setTitle(board.getTitle());
            boardListView.setContent(board.getContent());
            boardListView.setWriteDatetime(board.getWriteDatetime());
            boardListView.setWriterNickname(board.getWriterNickname());

            // 게시물의 이미지가 존재한다면 타이틀 이미지 설정하기
            if (imageRepository.findByBoard_BoardNumber(board.getBoardNumber()).size() != 0) {
                // 첫번째 이미지를 타이틀 이미지로 설정한다.
                String titleImage = imageRepository.findByBoard_BoardNumber(board.getBoardNumber()).get(0)
                        .getImageUrl();
                boardListView.setBoardTitleImage(titleImage);
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
            // boardNumber 로 게시물 찾기
            board = boardRepository.findByBoardNumber(boardNumber);
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

            // board.setImages(images);
            imageRepository.saveAll(images);

            boardRepository.save(board);

            // 타이틀 이미지는 게시물을 등록할 때가 아니라 불러올 때 설정하는 걸로!

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PostBoardResponseDto.success();
    }

    // 게시물 삭제하기
    public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber) {
        try {
            // 보드가 존재하지 않는 경우
            Board board = boardRepository.findByBoardNumber(boardNumber);
            if (board == null)
                return DeleteBoardResponseDto.noExistBoard();

            // 이미지 먼저 지우기!
            imageRepository.deleteByBoardBoardNumber(boardNumber);
            boardRepository.delete(board);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return DeleteBoardResponseDto.success();
    }

    // 게시물 수정하기
    public ResponseEntity<? super UpdateBoardResponseDto> updateBoard(@Valid UpdateBoardRequestDto dto,
            Integer boardNumber) {

        try {
            Board board = boardRepository.findByBoardNumber(boardNumber);
            if (board == null) {
                return UpdateBoardResponseDto.noExistBoard();
            }

            // board update 하기
            board.updateBoard(dto);

            // 원래 존재했던 이미지를 다 지우고 다시 꺼낸다.
            imageRepository.deleteByBoardBoardNumber(boardNumber);
            List<String> boardImageList = dto.getBoardImageList();
            List<Image> images = new ArrayList<>();

            for (String imageUrl : boardImageList) {
                Image image = new Image(board, imageUrl);
                images.add(image);
            }
            imageRepository.saveAll(images);
            boardRepository.save(board);

        } catch (Exception e) {
            e.printStackTrace();
            return UpdateBoardResponseDto.fail();
        }
        return UpdateBoardResponseDto.success();
    }

}
