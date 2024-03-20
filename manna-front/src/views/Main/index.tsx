import React, { useState, useEffect } from "react";
import "./style.css";
import BoardItem from "components/BoardItem/Index";
import BoardListItem from "types/interface/board-list-item.interface";
import topBoardListMock from "mocks/top-board-list.mock";

export default function Main() {
  const MainTop = () => {
    const [topBoardList, setTopBoardList] = useState<BoardListItem[]>([]);

    useEffect(() => {
      setTopBoardList(topBoardListMock);
    }, []);

    return (
      <div id="main-top-wrapper">
        <div className="main-top-container">
          <div className="main-top-intro">Manna Board</div>
          <div className="main-top-contents-box">
            <div className="main-top-contents-title"></div>
            <div className="main-top-contents">
              {topBoardList.map((topBoardList) => (
                <BoardItem boardListItem={topBoardList} />
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
