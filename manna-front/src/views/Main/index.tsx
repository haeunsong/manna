import React, { useState, useEffect } from "react";
import "./style.css";
import BoardItem from "components/BoardItem/Index";
import BoardListItem from "types/interface/board-list-item.interface";
import topBoardListMock from "mocks/top-board-list.mock";

import axios from "axios";

// Main 페이지에 게시글 전체 목록 조회
// boardList
export default function Main() {
  const MainTop = () => {
    const [boards, setBoards] = useState<BoardListItem[]>([]);

    console.log("boards:", boards);
    useEffect(() => {
      // setBoards(topBoardListMock);
      fetchPosts();
    }, []);

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/board/list"
        );
        setBoards(response.data);
      } catch (error) {
        console.error("전체 게시물 불러오기에 실패했습니다.", error);
      }
    };

    return (
      <div id="main-top-wrapper">
        <div className="main-top-container">
          {/* <div className="main-top-intro">게시글 목록</div> */}
          <div className="main-top-contents-box">
            {/* <div className="main-top-contents-title"></div> */}
            <div className="main-top-contents">
              {boards.map((boards) => (
                <BoardItem boardListItem={boards} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <MainTop />
    </div>
  );
}
