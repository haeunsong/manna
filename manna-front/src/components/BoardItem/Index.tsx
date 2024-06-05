import React from "react";
import "./style.css";
import BoardListItem from "types/interface/board-list-item.interface";
import { useNavigate } from "react-router-dom";
import { BOARD_DETAIL_PATH, BOARD_PATH } from "constant";

interface Props {
  boardListItem: BoardListItem;
}

export default function BoardItem({ boardListItem }: Props) {
  const {
    boardNumber,
    writerNickname,
    writeDatetime,
    title,
    content,
    boardTitleImage,
  } = boardListItem;

  const navigate = useNavigate();
  // /board/detail/:boardNumber
  const onMoveToDetailPageClickHandler = () => {
    navigate(BOARD_PATH() + "/" + BOARD_DETAIL_PATH(boardNumber));
  };
  const adminNicknameStyle = {
    color: writerNickname === "관리자" ? "red" : "black",
  };

  return (
    <div className="board-list-item">
      <div
        className="board-list-item-box"
        onClick={onMoveToDetailPageClickHandler}
      >
        {/* top 부분 */}
        <div className="board-list-item-top">
          <div className="board-list-item-nickname" style={adminNicknameStyle}>
            {writerNickname}
          </div>
          <div className="board-list-item-write-datetime">{writeDatetime}</div>
        </div>
        {/* middle 부분 */}
        <div className="board-list-item-middle">
          {boardTitleImage && (
            <img
              src={boardTitleImage}
              alt="boardTitle"
              className="board-list-item-title-image"
            />
          )}

          <div className="board-list-item-title">{title}</div>
          <div className="board-list-item-content">{content}</div>
        </div>
      </div>
    </div>
  );
}
