import Board from "types/interface/board.interface";
import ResponseDto from "..";
import BoardListItem from "types/interface/board-list-item.interface";

export default interface GetBoardResponseDto extends ResponseDto, Board, BoardListItem {
    
}