import React from "react";

import "./style.css";

export default function Pagination() {
  const onPageClickHandler = (page: number) => {};
  return (
    <div id="pagination-wrapper">
      <div className="pagination-change-link-box">
        <div className="icon-box-small">
          <div className="icon expand-left-icon"></div>
        </div>
      </div>

      <div className="pagination-text-active">{1}</div>
      <div className="pagination-text">{2}</div>

      <div className="pagination-change-link-box">
        <div className="icon-box-small">
          <div className="icon expand-right-icon"></div>
        </div>
      </div>
    </div>
  );
}
