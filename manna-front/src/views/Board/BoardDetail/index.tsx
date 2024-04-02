import React, { useState } from "react";
import "./style.css";

export default function BoardDetail() {
  const BoardDetailTop = () => {
    // state: more 버튼 상태
    const [showMore, setShowMore] = useState(false);

    // event handler: more 버튼 클릭 이벤트 처리
    const onMoreButtonClickHandler = () => {
      setShowMore(!showMore);
    };
    return (
      <div id="board-detail-top">
        {/* top */}
        <div className="board-detail-top-header">
          <div className="board-detail-title">제목제목제목</div>
          <div className="board-detail-subbox">
            <div className="board-detail-write-info-box">
              <div className="board-detail-writer-nickname">호야호잇</div>
              <div className="board-detail-info-divider">{"|"}</div>
              <div className="board-detail-write-date">2024-04-02 11:04:00</div>
            </div>
            <div className="icon-button" onClick={onMoreButtonClickHandler}>
              <div className="icon more-icon"></div>
            </div>
            {showMore && (
              <div className="board-detail-more-box">
                <div className="board-detail-update-button">{"수정"}</div>
                <div className="divider"></div>
                <div className="board-detail-delete-button">{"삭제"}</div>
              </div>
            )}
          </div>
        </div>
        {/* 구분선 */}
        <div className="divider"></div>
        {/* 본문 */}
        <div className="board-detail-top-main">
          <div className="board-detail-main-text">
            {
              "아내의 이야기를 예로 들어보자. 교수인 나는 학생들의 기말이 끝난 7월 초에 가장 여유가 있다. 하지만, 고등학생인 두 아들은 딱 그 기간에 기말고사를 본다. 여유가 있는 나는 아내에게 같이 놀러가자고 한다. 하지만 아내는 아들이 시험을 보는데 어떻게 놀라가냐며, 나를 나무란다. 우리 사회가 가지고 있 는 세대 갈등과 사회 갈등의 핵심에 무엇이 있는지 아는가? 바로 '인고의 착각'이다. 이런 생각 해 본 적이 있는가?"
            }
          </div>
          <img
            alt="배경1"
            className="board-detail-main-image"
            src="https://kor.pngtree.com/freebackground/cherry-blossoms-at-sunset-jpg_12755291.html"
          ></img>
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
