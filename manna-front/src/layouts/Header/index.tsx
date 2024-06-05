import {
  ADMIN_PAGE_PATH,
  AUTH_PATH,
  BOARD_DETAIL_PATH,
  BOARD_PATH,
  BOARD_UPDATE_PATH,
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
import { fileUploadRequest, postBoardRequest, updateBoardRequest } from "apis";
import axios from "axios";

import ResponseDto from "apis/response";
import {
  PostBoardResponseDto,
  UpdateBoardResponseDto,
} from "apis/response/board";
import { PostBoardRequestDto, UpdateBoardRequestDto } from "apis/request/board";

const Header = () => {
  const { pathname } = useLocation();
  const { boardNumber } = useParams();
  const parseBoardNumber = boardNumber as string | number;

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAdmin(true);
    }
  });
  // 현재 로그인 된 상태인지 아닌지 확인 용도

  const navigate = useNavigate();
  const isAuthPage = pathname === AUTH_PATH();
  const isMainPage = pathname === MAIN_PATH();
  const isAdminIndexPage = pathname === ADMIN_PAGE_PATH();
  const isBoardDetailPage = pathname.startsWith(
    BOARD_PATH() + "/" + BOARD_DETAIL_PATH("")
  );
  const isBoardWritePage = pathname.startsWith(
    BOARD_PATH() + "/" + BOARD_WRITE_PATH()
  );
  const isBoardUpdatePage = pathname.startsWith(
    BOARD_PATH() + "/" + BOARD_UPDATE_PATH(parseBoardNumber)
  );
  // state: 게시물 상태
  const { title, content, writerNickname, boardImageFileList, resetBoard } =
    useBoardStore();

  const onLogoClick = () => {
    navigate(MAIN_PATH());
  };
  const onContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "관리자 로그인 페이지로 이동하시겠습니까?"
    );
    if (userConfirmed) {
      navigate(AUTH_PATH());
    }
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
  // function :  update board response 처리 함수
  const updateBoardResponse = (
    responseBody: UpdateBoardResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "DBE") alert("데이터베이스 오류입니다.");
    if (code !== "SU") alert("오류발생");

    if (!boardNumber) return;
    // 글 수정하면 바로 메인 페이지로 가기
    navigate(MAIN_PATH());
    // navigate(BOARD_PATH() + "/" + BOARD_DETAIL_PATH(boardNumber), {
    //   replace: true,
    // });
  };

  // 글 업로드 버튼 클릭 시
  const onBoardUploadClickHandler = async () => {
    console.log("onBoardUploadClickHandler() 호출!");

    const boardImageList: string[] = [];
    // 동기 처리 해야함
    for (const file of boardImageFileList) {
      const data = new FormData();
      data.append("file", file);
      // data 전달
      const url = await fileUploadRequest(data);
      console.log("url  = " + url);
      if (url) boardImageList.push(url);
    }

    /*
     /board/write 페이지에서는 '글 업로드' 버튼으로,
     /board/{board} 에서는 수정하기..?
    
    */
    const isWriterpage = pathname === BOARD_PATH() + "/" + BOARD_WRITE_PATH();

    if (isWriterpage) {
      const requestBody: PostBoardRequestDto = {
        title,
        content,
        writerNickname,
        boardImageList,
      };

      postBoardRequest(requestBody).then(postBoardResponse);
    } else if (isBoardUpdatePage) {
      if (!boardNumber) return;
      const requestBody: UpdateBoardRequestDto = {
        title,
        content,
        writerNickname,
        boardImageList,
      };
      updateBoardRequest(boardNumber, requestBody).then(updateBoardResponse);
    }
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

  const onLogoutClickHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
    setIsAdmin(false);
  };
  return (
    <div id="header">
      <div className="header-container">
        <div
          className="header-left-box"
          onClick={onLogoClick}
          onContextMenu={onContextMenu}
        >
          <div className="icon-box">
            <div className="icon logo-icon"></div>
          </div>
          <div className="header-logo">{"Manna"}</div>
        </div>

        {isAuthPage && (
          <h1 style={{ color: "red" }}>
            관리자 가입 페이지 입니다. 관리자가 아닌 분은 나가주시기 바랍니다.
          </h1>
        )}

        {!isAuthPage && (
          <div className="header-middle-box">
            {/* {(isMainPage || isBoardDetailPage) && <SearchButton />}
             */}
            {!isBoardWritePage && <SearchButton />}
            {/* <SearchButton /> */}
          </div>
        )}

        {isAuthPage ? null : isBoardWritePage || isBoardUpdatePage ? (
          <div className="header-right-box">
            <button onClick={onBoardUploadClickHandler}>글 업로드</button>
          </div>
        ) : (
          <div className="header-right-box">
            <button onClick={onBoardWriteClickHandler}>글 작성하기</button>
          </div>
        )}

        {!isAdmin ? null : isAdminIndexPage ? (
          <button onClick={onLogoutClickHandler}>로그아웃</button>
        ) : (
          <div className="icon-box">
            <div
              className="icon user-icon"
              onClick={() => navigate("/admin/index")}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
