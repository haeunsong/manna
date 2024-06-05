import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import Board from "types/interface/board.interface";
import {
  deleteBoardRequest,
  getBoardDetailRequest,
  updateBoardRequest,
} from "apis";
import ResponseDto from "apis/response";
import { MAIN_PATH, BOARD_UPDATE_PATH, BOARD_PATH } from "constant";
import { GetBoardResponseDto } from "apis/response/board";
import DeleteBoardResponseDto from "apis/response/board/delete-board.response.dto";
import { UpdateBoardRequestDto } from "apis/request/board";

export default function BoardDetail() {
  const BoardDetailTop = () => {
    const [isAdmin, setIsAmdin] = useState(false);
    // state: more 버튼 상태
    const [showMore, setShowMore] = useState(false);
    // state: board
    const [board, setBoard] = useState<Board>();
    // state: 게시물 번호
    const { boardNumber } = useParams();

    // event handler: more 버튼 클릭 이벤트 처리
    const onMoreButtonClickHandler = () => {
      setShowMore(!showMore);
    };

    // event handler: 수정 버튼 클릭 이벤트 처리
    const onUpdateBoard = () => {
      if (!board || !boardNumber) return;
      navigator(BOARD_PATH() + "/" + BOARD_UPDATE_PATH(boardNumber), {
        replace: true,
      });
    };

    // event handler: 삭제 버튼 클릭 이벤트 처리
    const onDeleteBoard = () => {
      if (!board || !boardNumber) return;
      deleteBoardRequest(boardNumber).then(deleteBoardResponse);
    };

    // function : delete board Response 처리 함수
    const deleteBoardResponse = (
      responseBody: DeleteBoardResponseDto | ResponseDto | null
    ): void => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "DBE") {
        alert("데이터베이스 오류입니다.");
        return;
      }
      if (code !== "SU") return;

      alert("게시물을 성공적으로 삭제했습니다.");
      navigator(MAIN_PATH());
    };

    const navigator = useNavigate();

    // function : get board Response 처리함수
    const getBoardResponse = (
      responseBody: GetBoardResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "NB") alert("존재하지 않는 게시물입니다.");
      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code !== "SU") {
        navigator(MAIN_PATH());
        return;
      }
      const board: Board = {
        ...(responseBody as GetBoardResponseDto),
      };
      console.log("board", board);
      setBoard(board);
    };

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAmdin(true);
      }
      if (!boardNumber) {
        alert("해당 게시물이 존재하지 않습니다.");
      }
      getBoardDetailRequest(boardNumber).then(getBoardResponse);
    }, [boardNumber]);

    const adminNicknameStyle = {
      backgroundColor:
        board?.writerNickname === "관리자" ? "	#ff00b4" : "#7fffd4",
    };

    return (
      <div id="board-detail-top">
        {/* top */}
        <div className="board-detail-top-header">
          <div className="board-detail-title">{board?.title}</div>
          <div className="board-detail-subbox">
            <div className="board-detail-write-info-box">
              <div
                className="board-detail-writer-nickname"
                style={adminNicknameStyle}
              >
                {board?.writerNickname}
              </div>
              <div className="board-detail-info-divider">{"|"}</div>
              <div className="board-detail-write-date">
                {board?.writeDatetime}
              </div>
            </div>
            <div className="icon-button" onClick={onMoreButtonClickHandler}>
              <div className="icon more-icon"></div>
            </div>
            {showMore && (
              <div className="board-detail-more-box">
                <div
                  className="board-detail-update-button"
                  onClick={onUpdateBoard}
                >
                  {"수정"}
                </div>
                <div className="divider"></div>
                <div
                  className="board-detail-delete-button"
                  onClick={onDeleteBoard}
                >
                  {"삭제"}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* 구분선 */}
        <div className="divider"></div>
        {/* 본문 */}
        <div className="board-detail-top-main">
          <div className="board-detail-main-text">{board?.content}</div>
          {board?.boardImageList.map((src, index) => (
            <img
              key={index}
              className="board-detail-main-image"
              src={src}
              alt={`Board Image ${index}`}
            />
          ))}
        </div>
      </div>
    );
  };
  return (
    <div id="board-detail-wrapper">
      <div className="board-detail-container">
        <BoardDetailTop />
      </div>
    </div>
  );
}
