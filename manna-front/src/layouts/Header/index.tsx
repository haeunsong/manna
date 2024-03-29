import {
  BOARD_DETAIL_PATH,
  BOARD_PATH,
  BOARD_WRITE_PATH,
  MAIN_PATH,
  SEARCH_PATH,
} from "constant";
import React, {
  ChangeEvent,
  useRef,
  useState,
  KeyboardEvent,
  useEffect,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.css";
import useBoardStore from "stores/board.store";
import { fileUploadRequest, postBoardRequest } from "apis";
import axios from "axios";
import PostBoardRequestDto from "apis/request/board";
import PostBoardResponseDto from "apis/response/board";
import ResponseDto from "apis/response";

const Header = () => {
  const { pathname } = useLocation();

  const isMainPage = pathname === MAIN_PATH();
  const isBoardDetailPage = pathname.startsWith(
    BOARD_PATH() + "/" + BOARD_DETAIL_PATH("")
  );
  const isBoardWritePage = pathname.startsWith(
    BOARD_PATH() + "/" + BOARD_WRITE_PATH()
  );
  // state: 게시물 상태
  const { title, content, writerNickname, boardImageFileList, resetBoard } =
    useBoardStore();

  const navigate = useNavigate();

  const onLogoClick = () => {
    navigate(MAIN_PATH());
  };
  // 글 작성하기 버튼 클릭 시
  const onBoardWriteClickHandler = () => {
    navigate(BOARD_PATH() + "/" + BOARD_WRITE_PATH());
  };
  // function : post board response 처리 함수
  const postBoardResponse = (
    responseBody: PostBoardResponseDto | ResponseDto | null
  ) => {
    console.log(responseBody);
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "DBE") alert("데이터베이스 오류입니다.");
    if (code !== "SU") alert("오류발생");

    resetBoard();
    navigate(MAIN_PATH());
  };
  // 글 업로드 버튼 클릭 시
  const onBoardUploadClickHandler = async () => {
    console.log("onBoardUploadClickHandler() 호출!");
    const boardImageList: string[] = [];
    // 동기 처리 해야함
    for (const file of boardImageFileList) {
      console.log("image for문 으로 들어옴!");
      const data = new FormData();
      data.append("file", file);
      // data 전달
      const url = await fileUploadRequest(data);
      console.log("url  = " + url);
      if (url) boardImageList.push(url);
    }
    const requestBody: PostBoardRequestDto = {
      title,
      content,
      writerNickname,
      boardImageList,
    };
    console.log("requestBody 넘기자");
    postBoardRequest(requestBody).then(postBoardResponse);
  };

  const SearchButton = () => {
    // state: 검색어 버튼 요소 참조 상태
    const searchButtonRef = useRef<HTMLDivElement | null>(null);
    // state: 검색 버튼 상태
    const [status, setStatus] = useState<boolean>(true);
    // state: 검색어 상태
    const [word, setWord] = useState("");
    // state: 검색어 path variable 상태
    // App.tsx 에서 SEARCH_PATH(':searchWord') 해놓은 거랑 변수명 같아야 한다.
    const { searchWord } = useParams();

    const onSearchWordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setWord(e.target.value);
    };
    const onSearchWordKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;
      if (!searchButtonRef) return;
      searchButtonRef.current?.click();
    };
    const onSearchButtonClickHandler = () => {
      if (!status) {
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(word));
    };
    // effect: 검색어 path variable 변경될 때마다 실행될 함수
    useEffect(() => {
      if (searchWord) {
        setWord(searchWord);
        setStatus(true);
      }
    }, [searchWord]);
    if (!status)
      return (
        <div className="icon-button" onClick={onSearchButtonClickHandler}>
          <div className="icon search-light-icon"></div>
        </div>
      );

    return (
      <div className="header-search-input-box">
        <input
          className="header-search-input"
          type="text"
          placeholder="검색어를 입력해주세요."
          value={word}
          onChange={onSearchWordChangeHandler}
          onKeyDown={onSearchWordKeyDownHandler}
        />
        <div
          ref={searchButtonRef}
          className="icon-button"
          onClick={onSearchButtonClickHandler}
        >
          <div className="icon search-light-icon"></div>
        </div>
      </div>
    );
  };
  return (
    <div id="header">
      <div className="header-container">
        <div className="header-left-box" onClick={onLogoClick}>
          <div className="icon-box">
            <div className="icon logo-icon"></div>
          </div>
          <div className="header-logo">{"Manna"}</div>
        </div>
        <div className="header-middle-box">
          {/* {(isMainPage || isBoardDetailPage) && <SearchButton />}
           */}
          {!isBoardWritePage && <SearchButton />}
          {/* <SearchButton /> */}
        </div>
        {isBoardWritePage ? (
          <div className="header-right-box">
            <button onClick={onBoardUploadClickHandler}>글 업로드</button>
          </div>
        ) : (
          <div className="header-right-box">
            <button onClick={onBoardWriteClickHandler}>글 작성하기</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
