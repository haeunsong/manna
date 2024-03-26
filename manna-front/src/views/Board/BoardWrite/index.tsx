import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import "./style.css";
import useBoardStore from "stores/board.store";

export default function BoardWrite() {
  // state: 제목 영역 요소 참조 상태
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
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

  // event handler
  const onTitleChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    if (!titleRef.current) return;
    titleRef.current.style.height = "auto";
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
  };
  const onContentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (!contentRef.current) return;
    contentRef.current.style.height = "auto";
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
  };
  const onImageUploadIconButtonClickHandler = () => {
    if (!imageInputRef.current) return;
    imageInputRef.current.click();
  };
  // 이미지 닫기 버튼
  const onImageCloseButtonClickHandler = (deleteIndex: number) => {
    if (!imageInputRef.current) return;
    imageInputRef.current.value = "";

    const newImageUrls = imageUrls.filter(
      (url, index) => index !== deleteIndex
    );
    setImageUrls(newImageUrls);

    const newBoardImageFileList = boardImageFileList.filter(
      (file, index) => index !== deleteIndex
    );
    setBoardImageFileList(newBoardImageFileList);
  };
  const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;
    const file = e.target.files[0];

    // 미리보기용 url
    const imageUrl = URL.createObjectURL(file);
    const newImageUrls = imageUrls.map((item) => item);
    newImageUrls.push(imageUrl);
    setImageUrls(newImageUrls);

    // 업로드용
    const newBoardImageFileList = boardImageFileList.map((item) => item);
    newBoardImageFileList.push(file);
    setBoardImageFileList(newBoardImageFileList);

    // 이걸 안하면 중복 사진을 넣지 못한다.
    if (!imageInputRef.current) return;
    imageInputRef.current.value = "";
  };

  // effect: 마운트시 실행할 함수
  useEffect(() => {
    resetBoard();
  }, []);

  return (
    <div id="board-write-wrapper">
      <div className="board-write-container">
        <div className="board-write-box">
          <div className="board-write-title-box">
            <textarea
              ref={titleRef}
              className="board-write-title-textarea"
              placeholder="제목을 작성해주세요."
              value={title}
              onChange={onTitleChangeHandler}
              rows={1}
            ></textarea>
          </div>
          <div className="divider"></div>
          <div className="board-write-content-box">
            <textarea
              ref={contentRef}
              className="board-write-content-textarea"
              placeholder="본문을 작성해주세요."
              value={content}
              onChange={onContentChangeHandler}
            />
            <div
              className="icon-button"
              onClick={onImageUploadIconButtonClickHandler}
            >
              <div className="icon image-box-light-icon"></div>
            </div>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onImageChangeHandler}
            />
          </div>
          <div className="board-write-images-box">
            {imageUrls.map((imageUrl, index) => (
              <div className="board-write-image-box">
                <img className="board-write-image" src={imageUrl} />
                <div
                  className="icon-button image-close"
                  onClick={() => onImageCloseButtonClickHandler(index)}
                >
                  <div className="icon close-icon"></div>
                </div>
              </div>
            ))}

            {/* <div className="board-write-image-box">
              <img
                className="board-write-image"
                src="https://img.freepik.com/premium-photo/modern-city_637484-170.jpg?w=740"
              />
              <div className="icon-button image-close">
                <div className="icon close-icon"></div>
              </div>
            </div>
            <div className="board-write-image-box">
              <img
                className="board-write-image"
                src="https://img.freepik.com/free-photo/beautiful-shot-of-colorful-apartment-buildings-on-a-rocky-hill-on-the-seashore-under-the-blue-sky_181624-7318.jpg?w=1380&t=st=1711285811~exp=1711286411~hmac=7451fd723e618757ca85521fbc4083003f5bbb18d6579e99d54bd9e5895a4d09"
              />
              <div className="icon-button image-close">
                <div className="icon close-icon"></div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
