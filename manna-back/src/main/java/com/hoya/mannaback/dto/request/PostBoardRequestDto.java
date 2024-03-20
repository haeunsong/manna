package com.hoya.mannaback.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PostBoardRequestDto {
    @NotBlank
    private String writerNickname;
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    @NotNull // 빈배열이 올수는 있지만, 해당 필드는 반드시 존재해야함
    private List<String> boardImageList;

}
