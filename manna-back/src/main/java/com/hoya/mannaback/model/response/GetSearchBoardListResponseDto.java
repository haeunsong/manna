package com.hoya.mannaback.model.response;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestClient.ResponseSpec;

import com.hoya.mannaback.common.ResponseCode;
import com.hoya.mannaback.common.ResponseMessage;
import com.hoya.mannaback.entity.Board;

import lombok.Getter;

@Getter
public class GetSearchBoardListResponseDto extends ResponseDto {

    private List<Board> searchList;

    private GetSearchBoardListResponseDto(List<Board> boardList) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.searchList = boardList;
    }

    public static ResponseEntity<GetSearchBoardListResponseDto> success(List<Board> boardList) {
        GetSearchBoardListResponseDto result = new GetSearchBoardListResponseDto(boardList);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}