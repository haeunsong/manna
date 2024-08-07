import React, { useState, useEffect } from "react";
import "./style.css";

import BoardListItem from "types/interface/board-list-item.interface";
import topBoardListMock from "mocks/top-board-list.mock";

import axios from "axios";
import BoardItem from "components/BoardItem/Index";
import Pagination from "components/Pagination";
import usePagination from "hooks/pagination.hook";

import ResponseDto from "apis/response";
import { GetBoardResponseDto } from "apis/response/board";

// Main 페이지에 게시글 전체 목록 조회
// boardList
export default function BoardMain() {
  // state : 페이지네이션 관련 상태
  const {
    currentPageNumber,
    currentSectionNumber,
    setCurrentPageNumber,
    setCurrentSectionNumber,
    viewList,

    viewPageNumberList,
    totalSectionNumber,
    setTotalList,
  } = usePagination<BoardListItem>(6);

  const [boards, setBoards] = useState<BoardListItem[]>([]);

  useEffect(() => {
    fetchPostsRequest(boards);
  }, []);

  // 백엔드에서 전체 게시물 목록 조회
  const fetchPostsRequest = async (boards: BoardListItem[]) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/board/list"
      );
      const responseBody: GetBoardResponseDto = response.data;
      setBoards(response.data);
      setTotalList(response.data);

      return responseBody;
    } catch (error: any) {
      console.error("전체 게시물 불러오기에 실패했습니다.", error);

      if (!error.response) return null;
      const responseBody: GetBoardResponseDto = error.response.data;
      console.log("error.response.data:" + error.response.data);
      return responseBody;
    }
  };

  return (
    <div id="main-top-wrapper">
      <div className="main-top-container">
        {/* <div className="main-top-intro">게시글 목록</div> */}
        <div className="main-top-contents-box">
          {/* <div className="main-top-contents-title"></div> */}
          <div className="main-top-contents">
            {viewList.map((boards) => (
              <BoardItem key={boards.boardNumber} boardListItem={boards} />
            ))}
          </div>
          <div className="main-pagination">
            {
              <Pagination
                currentPage={currentPageNumber}
                currentSection={currentSectionNumber}
                setCurrentPage={setCurrentPageNumber}
                setCurrentSection={setCurrentSectionNumber}
                viewPageList={viewPageNumberList}
                totalSection={totalSectionNumber}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
