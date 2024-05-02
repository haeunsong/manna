export default interface UpdateBoardRequestDto {
    title: string;
    content: string;
    writerNickname: string;
    boardImageList: string[];
}