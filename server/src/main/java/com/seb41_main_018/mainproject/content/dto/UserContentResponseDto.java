package com.seb41_main_018.mainproject.content.dto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@ApiModel("UserContent Response")
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UserContentResponseDto{
    @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
    private Long contentId;
    @ApiModelProperty(notes = "컨텐트 제목", example = "기가 막힌 서울여행", required = true)
    @NotBlank(message = "게시글 제목을 입력해야합니다.")
    private String title;

    @ApiModelProperty(notes = "상세 루트들", example = "창경궁", required = true)
    private List<ContentRouteResponseDto> routes;

    @ApiModelProperty(notes = "컨텐츠 작성 날짜와 시간", example = "2023.01.20", required = true)
    private LocalDateTime createdAt;

    @ApiModelProperty(notes = "컨텐츠 수정 날짜와 시간", example = "2023.01.20", required = true)
    private LocalDateTime modifiedAt;

}