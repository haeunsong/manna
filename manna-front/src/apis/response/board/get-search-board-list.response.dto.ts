import BoardListItem from "types/interface/board-list-item.interface";
import ResponseDto from "..";
import Board from "types/interface/board.interface";

export default interface  GetSearchBoardListResponseDto extends ResponseDto, Board, BoardListItem {
   searchList: BoardListItem[];
}