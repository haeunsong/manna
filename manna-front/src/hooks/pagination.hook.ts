import { useState,useEffect,Dispatch } from "react";

// interface : 페이지네이션 컴포넌트 Properties
// 여러곳에서 공통적으로 사용할 것이기 때문에 제네릭 타입으로 설정
// countPerPage: 한 페이지 당 보여지는 항목의 수
const usePagination = <T>(countPerPage:number) => {
    // state : 전체 객체 리스트 상태
    const [totalList, setTotalList] = useState<T[]>([]);
    // state: 보여줄 객체 리스트 상태
    const [viewList, setViewList] = useState<T[]>([]);
    // state: 현재 페이지 번호 상태
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

    // state: 전체 페이지 번호 리스트 상태
    const [totalPageNumberList, setTotalPageNumberList] = useState<number[]>([1]);
    // state: 보여줄 페이지 번호 리스트 상태
    const [viewPageNumberList, setViewPageNumberList] = useState<number[]>([1]);
    // state: 현재 섹션 상태
    const [currentSectionNumber, setCurrentSectionNumber] = useState<number>(1);

    // state: 전체 섹션 상태
    const [totalSectionNumber, setTotalSectionNumber] = useState<number>(1);

    // function: 보여줄 객체 리스트 추출 함수
    // viewList: 한 페이지당 보여줄 게시물들
    const setView = () => {
        const FIRST_INDEX  = countPerPage * (currentPageNumber -1);
        const LAST_INDEX = countPerPage * currentPageNumber;
        const viewList = totalList.slice(FIRST_INDEX, totalList.length > LAST_INDEX ? LAST_INDEX : totalList.length);
        setViewList(viewList);
    }
    // function: 보여줄 페이지 리스트 추출 함수
    // viewPageNumberList: 한페이지의 아래쪽에 보여줄 페이지 넘버 리스트 
    const setViewPage = () => {
        const FIRST_INDEX = 10 * (currentSectionNumber - 1);
        const LAST_INDEX = totalPageNumberList.length > 10 * currentSectionNumber ? 10 * currentSectionNumber : totalPageNumberList.length;
        const viewPageNumberList = totalPageNumberList.slice(FIRST_INDEX, LAST_INDEX);
        setViewPageNumberList(viewPageNumberList);
    }
    // effect: total list 가 변경될 때마다 실행할 작업
    useEffect(() => {
        const totalPageNumber = Math.ceil(totalList.length/countPerPage);  // 전체 페이지번호수 = 전체게시물 수 / 한페이지당 게시물 수 
        const totalPageNumberList: number[] = []; // 전체 페이지번호 리스트
        for(let page=1; page<=totalPageNumber; page++) totalPageNumberList.push(page);
        setTotalPageNumberList(totalPageNumberList);

        const totalSectionNumber = Math.ceil(totalList.length / (countPerPage * 10)); // 총 섹션의 수 = 전체게시물 수 / (한 페이지당 게시물 수 * 한페이지에 보일 페이지번호)
        setTotalSectionNumber(totalSectionNumber);

        setCurrentPageNumber(1);
        setCurrentSectionNumber(1);

        setView();
        setViewPage();
    },[totalList])
    // effect : current page 가 변경될 때마다 실행할 작업
    useEffect(setView, [currentPageNumber])

    // effect : current section 이 변경될 때마다 실행할 작업
    useEffect(setViewPage, [currentSectionNumber])   


    return {
        currentPageNumber,
        setCurrentPageNumber,
        currentSectionNumber,
        setCurrentSectionNumber, // 섹션 바꾸는 작업
        viewList, // 현재 보여줄 리스트
        viewPageNumberList, 
        totalSectionNumber, // 현재 섹션과 마지막 섹션이 동일하다면 화살표 안 넘어가도록
        setTotalList
    }
  


}
export default usePagination;