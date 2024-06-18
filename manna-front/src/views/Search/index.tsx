import React, { useState, useEffect } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import BoardListItem from "types/interface/board-list-item.interface";
import BoardItem from "components/BoardItem/Index";
//import { getSearchBoardListRequest } from "apis";
import { GetSearchBoardListResponseDto } from "apis/response/board";
import ResponseDto from "apis/response";
import usePagination from "hooks/pagination.hook";
import Pagination from "components/Pagination";
import axios from "axios";

export default function Search() {
  const { searchWord } = useParams();
  const [preSearchWord, setPreSearchWord] = useState<string | null>(null);
  const [count, setCount] = useState(0);

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

  //   const getSearchBoardListResponse = (
  //     responseBody: GetSearchBoardListResponseDto | ResponseDto | null
  //   ) => {
  //     if (!responseBody) return;
  //     const { code } = responseBody;
  //     if (code === "DBE") alert("데이터베이스 오류입니다.");
  //     if (code !== "SU") return;

  //     if (!searchWord) return;
  //     const { searchList } = responseBody as GetSearchBoardListResponseDto;
  //     setTotalList(searchList);
  //     setCount(searchList.length);
  //     setPreSearchWord(searchWord);
  //   };
  //   useEffect(() => {
  //     if (!searchWord) return;
  //     getSearchBoardListRequest(searchWord, preSearchWord).then(
  //       getSearchBoardListResponse
  //     );
  //   }, [searchWord]);
  useEffect(() => {
    if (!searchWord) return;

    // 새로운 검색이 시작될 때마다 상태 초기화
    setBoards([]);
    setCount(0);
    setCurrentPageNumber(1);
    setCurrentSectionNumber(1);

    getSearchBoardListRequest(searchWord, preSearchWord);
  }, [searchWord]); // `searchWord`가 변경될 때마다 새로운 검색 요청

  // 검색 결과 리스트 받아오기
  const GET_SEARCH_BOARD_LIST_URL = (
    searchWord: string,
    preSearchWord: string | null
  ) =>
    `/api/v1/board/search-list/${searchWord}${
      preSearchWord ? `/${preSearchWord}` : ""
    }`;

  const getSearchBoardListRequest = async (
    searchWord: string,
    preSearchWord: string | null
  ) => {
    try {
      const response = await axios.get(
        GET_SEARCH_BOARD_LIST_URL(searchWord, preSearchWord),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 토큰을 localStorage (또는 적절한 위치)에서 가져오는 코드
            "Content-Type": "application/json",
          },
        }
      );
      const responseBody: GetSearchBoardListResponseDto = response.data;
      console.log("responseBody", responseBody);
      setBoards(responseBody.searchList); // searchList로 상태 업데이트
      setCount(responseBody.searchList.length); // 게시물 개수 업데이트
      setTotalList(responseBody.searchList); // 페이지네이션 리스트 초기화
      setPreSearchWord(searchWord); // 이전 검색어 업데이트
      return responseBody;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseBody: ResponseDto = error.response?.data;
        return responseBody;
      } else {
        throw error; // AxiosError가 아닌 다른 타입의 오류는 다시 던짐
      }
    }
  };
  return (
    <div id="search-wrapper">
      <div className="search-container">
        <div className="search-title-box">
          <div className="search-title">
            <span>{searchWord}&nbsp;</span>에 관한 검색결과입니다.
          </div>
          <div className="search-count">
            <span>&nbsp;{count}</span>개
          </div>
        </div>
        <div className="search-contents-box">
          {count === 0 ? (
            <div className="search-content-nothing">
              {"검색 결과가 없습니다."}
            </div>
          ) : (
            <div className="search-contents">
              {viewList.map((boards) => (
                <BoardItem key={boards.boardNumber} boardListItem={boards} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="search-pagination-box">
        {count !== 0 && (
          <Pagination
            currentPage={currentPageNumber}
            currentSection={currentSectionNumber}
            setCurrentPage={setCurrentPageNumber}
            setCurrentSection={setCurrentSectionNumber}
            viewPageList={viewPageNumberList}
            totalSection={totalSectionNumber}
          />
        )}
      </div>
    </div>
  );
}
