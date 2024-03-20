import React from "react";
import "./style.css";
import BoardListItem from "types/interface/board-list-item.interface";

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

  return (
    <div
      className="board-list-item"
      style={{ backgroundImage: `url(${boardTitleImage})` }}
    >
      <div className="board-list-item-box">
        {/* top 부분 */}
        <div className="board-list-item-top">
          <div className="board-list-item-nickname">{writerNickname}</div>
          <div className="board-list-item-write-datetime">{writeDatetime}</div>
        </div>
        {/* middle 부분 */}
        <div className="board-list-item-middle">
          <div className="board-list-item-title">{title}</div>
          <div className="board-list-item-content">{content}</div>
        </div>
      </div>

      {/* 이미지 존재할 시 이미지 */}

      {boardTitleImage !== null && (
        <div className="board-list-item-image-box">
          <div
            className="board-list-item-image"
            style={{ backgroundImage: `url(${boardTitleImage})` }}
          ></div>
        </div>
      )}
    </div>
  );
}
