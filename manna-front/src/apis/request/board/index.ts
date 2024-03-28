
// 1. 요청 인터페이스 먼저 정의
export default interface PostBoardRequestDto {
    title: string;
    content: string;
    writerNickname: string;
    boardImageList: string[];
}
