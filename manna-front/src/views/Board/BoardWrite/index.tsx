import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import useBoardStore from "stores/board.store";

export default function BoardWrite() {
  // state: 본문 영역 요소 참조 상태
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  // state: 이미지 입력 요소 참조 상태
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  // state: 게시물 상태
  const { title, setTitle } = useBoardStore();
  const { content, setContent } = useBoardStore();
  const { boardImageFileList, setBoardImageFileList } = useBoardStore();
  const { resetBoard } = useBoardStore();

  // state: 게시물 이미지 미리보기 url 상태
  // image box 가 얘를 반복돌면서 출력
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // effect: 마운트시 실행할 함수
  useEffect(() => {
    resetBoard();
  }, []);

  return (
    <div id="board-write-wrapper">
      <div className="board-write-container">
        <div className="board-write-box">
          <div className="board-write-title-box">
            <input
              className="board-write-title-input"
              type="text"
              placeholder="제목을 작성해주세요."
              value=""
            ></input>
          </div>
          <div className="divider"></div>
          <div className="board-write-content-box">
            <textarea
              ref={contentRef}
              className="board-write-content-textarea"
              placeholder="본문을 작성해주세요."
            />
            <div className="icon-button">
              <div className="icon image-box-light-icon"></div>
            </div>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
            <input />
          </div>
          <div className="board-write-images-box">
            <div className="board-write-image-box">
              <img className="board-write-image" />
              <div className="icon-button image-close">
                <div className="icon close-icon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
