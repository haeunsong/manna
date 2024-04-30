import React, { SetStateAction, Dispatch } from "react";

import "./style.css";

interface Props {
  currentPage: number;
  currentSection: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setCurrentSection: Dispatch<SetStateAction<number>>;

  viewPageList: number[];
  totalSection: number;
}
export default function Pagination(props: Props) {
  const { currentPage, currentSection, viewPageList, totalSection } = props;
  const { setCurrentPage, setCurrentSection } = props;

  const onPageClickHandler = (page: number) => {
    console.log("클릭");
    setCurrentPage(page);
  };

  const onSectionClickHandler = (section: number) => {
    setCurrentSection(section);
    setCurrentPage((section - 1) * 10 + 1);
  };

  const onPreviousClickHanlder = () => {
    if (currentSection === 1) return;
    setCurrentPage((currentSection - 1) * 10);
    setCurrentSection(currentSection - 1);
  };

  const onNextClickHanlder = () => {
    if (currentSection === totalSection) return;
    setCurrentPage(currentSection * 10 + 1);
    setCurrentSection(currentSection + 1);
  };
  return (
    <div id="pagination-wrapper">
      <div
        className="pagination-change-link-box"
        onClick={onPreviousClickHanlder}
      >
        <div className="icon-box-small">
          <div className="icon expand-left-icon"></div>
        </div>
      </div>

      {/* {viewPageList.map((page) =>
        page === currentPage ? (
          <div className="pagination-text-active">{page}</div>
        ) : (
          <div
            className="pagination-text"
            onClick={() => onPageClickHandler(page)}
          >
            {page}
          </div>
        )
      )} */}
      {viewPageList.map((page) => (
        <div
          key={page}
          className={`pagination-text ${currentPage === page ? "active" : ""}`}
          onClick={() => onPageClickHandler(page)}
        >
          {page}
        </div>
      ))}

      <div className="pagination-change-link-box" onClick={onNextClickHanlder}>
        <div className="icon-box-small">
          <div className="icon expand-right-icon"></div>
        </div>
      </div>
    </div>
  );
}
