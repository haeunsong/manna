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

    /*
    boardNumber: 13
    content: "어려움을 논하지 말라...\n"
    title: "하루에 2시간도 코테안하면서! 일주일에 몇 문제 안풀면서!"
    titleImage: "http://localhost:4000/file/9f1be302-7696-4526-9f1d-65af6cebe932.jpg"
    writeDatetime: "2024-04-04 12:57:52"
    writerNickname: "투덜투덜"
    */
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
