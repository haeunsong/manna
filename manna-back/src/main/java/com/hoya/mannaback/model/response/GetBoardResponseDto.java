package com.hoya.mannaback.model.response;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hoya.mannaback.common.ResponseCode;
import com.hoya.mannaback.common.ResponseMessage;
import com.hoya.mannaback.entity.Board;
import com.hoya.mannaback.entity.Image;

import lombok.Getter;

@Getter
public class GetBoardResponseDto extends ResponseDto {

    private int boardNumber;
    private String writerNickname;
    private String writeDatetime;

    private String title;
    private String content;

    private List<String> boardImageList;

    public GetBoardResponseDto(Board board, List<Image> images) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        // imageUrl 리스트
        List<String> boardImageList = new ArrayList<>();

        for (Image image : images) {
            String imgUrl = image.getImageUrl();
            boardImageList.add(imgUrl);

        }
        this.boardNumber = board.getBoardNumber();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.writerNickname = board.getWriterNickname();
        this.writeDatetime = board.getWriteDatetime();

        this.boardImageList = boardImageList;
    }

    public static ResponseEntity<GetBoardResponseDto> success(Board board, List<Image> images) {
        GetBoardResponseDto result = new GetBoardResponseDto(board, images);
        return ResponseEntity.status(HttpStatus.OK).body(result);

    }

    public static ResponseEntity<ResponseDto> noExistBoard() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

}
