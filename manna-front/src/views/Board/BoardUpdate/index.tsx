import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import "./style.css";
import useBoardStore from "stores/board.store";
import { useNavigate, useParams } from "react-router-dom";
import { getBoardDetailRequest } from "apis";
import { GetBoardResponseDto } from "apis/response/board";
import ResponseDto from "apis/response";
import { MAIN_PATH } from "constant";

export default function BoardUpdate() {
  // state: 닉네임 영역 요소 참조 상태
  const writerNicknameRef = useRef<HTMLInputElement | null>(null);
  // state: 제목 영역 요소 참조 상태
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  // state: 본문 영역 요소 참조 상태
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  // state: 이미지 입력 요소 참조 상태
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  // state: 게시물 번호 상태
  const { boardNumber } = useParams();

  // state: 게시물 상태
  const { title, setTitle } = useBoardStore();
  const { content, setContent } = useBoardStore();
  const { writerNickname, setWriterNickname } = useBoardStore();
  const { boardImageFileList, setBoardImageFileList } = useBoardStore();
  const { resetBoard } = useBoardStore();

  // state: 게시물 이미지 미리보기 url 상태
  // image box 가 얘를 반복돌면서 출력
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // function : navigator 처리 함수
  const navigator = useNavigate();

  // function : getBoardDetailResponse 처리 함수
  const getBoardDetailResponse = (
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

    const { title, content, writerNickname, boardImageList } =
      responseBody as GetBoardResponseDto;
    setTitle(title);
    setContent(content);
    setWriterNickname(writerNickname);
    setImageUrls(boardImageList);

    if (!contentRef.current) return;
    contentRef.current.style.height = "auto";
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
  };
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
  const onWriterNicknameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setWriterNickname(e.target.value);
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
    // 첫번째 파일을 가져와서
    const file = e.target.files[0];

    // 미리보기용 url을 생성한다.
    const imageUrl = URL.createObjectURL(file);
    // 이전 imageUrls 을 모두 복사하고
    const newImageUrls = imageUrls.map((item) => item);
    // 새로운 ImageUrl을 넣는다.
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
    getBoardDetailRequest(boardNumber).then(getBoardDetailResponse);
  }, [boardNumber]);

  return (
    <div id="board-write-wrapper">
      <div className="board-write-container">
        <div className="board-write-box">
          <div className="board-write-nickname-box">
            <input
              ref={writerNicknameRef}
              className="board-write-nickname"
              placeholder="닉네임을 입력해주세요."
              value={writerNickname}
              onChange={onWriterNicknameChangeHandler}
            ></input>
          </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
