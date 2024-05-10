package com.hoya.mannaback.model.request;

import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateBoardRequestDto {

    @NotBlank
    private String title;
    @NotBlank
    private String content;
    @NotBlank
    private String writerNickname;

    private List<String> boardImageList = new ArrayList<>();

}
