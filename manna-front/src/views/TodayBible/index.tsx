import React, { useState, useEffect } from "react";
import "./style.css";
import { getReadBibleRequest, getTodayBibleRequest } from "apis";
import { GetTodayBibleResponseDto } from "apis/response/bible";
import ResponseDto from "apis/response";
import Bible from "types/interface/bible.interface";
import { GetReadBibleRequestDto } from "apis/request/bible";
import { request } from "http";
import GetReadBibleResponseDto from "apis/response/bible/get-read-bible.response.dto";

export default function TodayBible() {
  const oldTestamentBooks = [
    "창세기",
    "출애굽기",
    "레위기",
    "민수기",
    "신명기",
    "여호수아",
    "사사기",
    "룻기",
    "사무엘상",
    "사무엘하",
    "열왕기상",
    "열왕기하",
    "역대상",
    "역대하",
    "에스라",
    "느혜미야",
    "에스더",
    "욥기",
    "시편",
    "잠언",
    "전도서",
    "아가",
    "이사야",
    "예레미야",
    "예레미야애가",
    "에스겔",
    "다니엘",
    "호세아",
    "요엘",
    "아모스",
    "오바댜",
    "요나",
    "미가",
    "나훔",
    "하박국",
    "스바냐",
    "학개",
    "스가랴",
    "말라기",
  ];
  const newTestamentBooks = [
    "마태복음",
    "마가복음",
    "누가복음",
    "요한복음",
    "사도행전",
    "로마서",
    "고린도전서",
    "고린도후서",
    "갈라디아서",
    "에베소서",
    "빌립보서",
    "골로새서",
    "데살로니가전서",
    "데살로니가후서",
    "디모데전서",
    "디모데후서",
    "디도서",
    "빌레몬서",
    "히브리서",
    "야고보서",
    "베드로전서",
    "베드로후서",
    "요한일서",
    "요한이서",
    "요한삼서",
    "유다서",
    "요한계시록",
  ];
  // state: bible
  const [bible, setBible] = useState<Bible>();
  const [readBibleData, setReadBibleData] = useState<Bible[]>();

  const [selectedBook, setSelectedBook] = useState(""); // 선택된 성경 책
  const [selectedLongLabel, setSelectedLongLabel] = useState("");
  const [selectedChapter, setSelectedChapter] = useState(1); // 선택된 장
  useEffect(() => {
    getTodayBibleRequest().then(getTodayBibleResponse);
  }, []);

  const getTodayBibleResponse = (
    responseBody: GetTodayBibleResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;
    const bible: Bible = {
      ...(responseBody as GetTodayBibleResponseDto),
    };
    setBible(bible);
  };
  // function : 구절 복사하기
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => console.log("Copied to clipboard!"),
      () => console.log("Failed to copy!")
    );
  };
  // function : 구절 복사시 형식 지정하기
  const copyVerseToClipboard = (bible: Bible) => {
    if (!bible) return;
    const formattedText = `❤️${bible.longLabel}${bible.chapter}:${bible.paragraph}❤️\n${bible.sentence}`;
    copyToClipboard(formattedText);
  };
  const onClickTitle = (e: any) => {
    const buttonValue = e.currentTarget.value;

    console.log(`${e.target.value} 를 클릭하였습니다.`);

    // 같은 버튼을 한번 더 클릭하면 초기화되고 이 시각 말씀 을 띄운다.
    if (buttonValue === selectedLongLabel) {
      setReadBibleData(undefined);
      setSelectedLongLabel("");
      return;
    }
    setSelectedLongLabel(e.target.value);

    try {
      let longLabel = "";
      for (let i = 0; i < oldTestamentBooks.length; i++) {
        if (e.target.value === oldTestamentBooks[i]) {
          longLabel = oldTestamentBooks[i];
        }
      }
      for (let i = 0; i < newTestamentBooks.length; i++) {
        if (e.target.value === newTestamentBooks[i]) {
          longLabel = newTestamentBooks[i];
        }
      }

      const requestBody: GetReadBibleRequestDto = { long_label: longLabel };
      getReadBibleRequest(requestBody).then(getReadBibleResponse);
    } catch (error) {
      console.error("Error fetching Bible verse");
    }
  };

  // long_label 에 해당하는 모든 데이터베이스 본문을 받아온다.

  const getReadBibleResponse = (responseBody: GetReadBibleResponseDto[]) => {
    if (!responseBody || responseBody.length === 0) return;

    const readBible: Bible[] = responseBody.map((item) => ({
      id: item.id,
      cate: item.cate,
      book: item.book,
      chapter: item.chapter,
      paragraph: item.paragraph,
      sentence: item.sentence,
      testament: item.testament,
      longLabel: item.longLabel,
      shortLabel: item.shortLabel,
    }));

    setReadBibleData(readBible);
  };
  const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChapter = parseInt(e.target.value);
    setSelectedChapter(selectedChapter);
    // 로직: 선택된 장에 맞는 성경 구절을 서버에서 가져와서 state 업데이트
    // 예를 들어, getReadBibleRequest를 다시 호출하거나, 이미 받아온 데이터에서 선택된 장만 필터링하여 업데이트할 수 있음
  };
  const chapters = Array.from({ length: 150 }, (_, index) => index + 1);

  return (
    <div id="bible-wrapper">
      <div className="today-verse">
        <div className="title"> 이 시각 말씀</div>

        <span className="bible-long-label">{bible?.longLabel}&nbsp;</span>
        <span className="bible-chapter">{bible?.chapter}:</span>
        <span className="bible-paragraph">{bible?.paragraph}&nbsp;</span>
        <div className="bible-sentence">{bible?.sentence}&nbsp;</div>
      </div>

      <div className="read-bible-wrapper">
        <div className="title">
          {selectedLongLabel} {selectedChapter}장
        </div>
        {selectedChapter && (
          <div className="chapter-dropdown">
            <select value={selectedChapter} onChange={handleChapterChange}>
              {chapters.map((chapter) => (
                <option key={chapter} value={chapter}>
                  {chapter}장
                </option>
              ))}
            </select>
          </div>
        )}
        {readBibleData
          ?.filter(
            (verse) =>
              verse.longLabel === selectedLongLabel &&
              verse.chapter === selectedChapter
          )
          .map((verse) => (
            <div key={verse.id} className="bible-verse">
              <div
                className="one-verse"
                onClick={() => copyVerseToClipboard(verse)}
              >
                <span className="bible-paragraph">{verse.paragraph}&nbsp;</span>
                <div className="bible-sentence">{verse.sentence}&nbsp;</div>
              </div>
            </div>
          ))}
      </div>

      <div className="today-read">
        <div className="title"> 통독 본문</div>
        <div className="old-testament">
          <div className="testament-v">구약</div>
          {oldTestamentBooks.map((book, idx) => (
            <button
              key={idx}
              value={book}
              onClick={onClickTitle}
              style={{ fontSize: book == "예레미야애가" ? "14px" : "inherit" }}
            >
              {book}
            </button>
          ))}
        </div>

        <div className="new-testament">
          <div className="testament-v">신약</div>
          {newTestamentBooks.map((book, idx) => (
            <button
              key={idx}
              value={book}
              onClick={onClickTitle}
              style={{
                fontSize:
                  book == "데살로니가전서" || book === "데살로니가후서"
                    ? "12px"
                    : "inherit",
              }}
            >
              {book}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
