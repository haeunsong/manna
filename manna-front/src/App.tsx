import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  ADMIN_PAGE_PATH,
  AUTH_PATH,
  BOARD_DETAIL_PATH,
  BOARD_MAIN_PATH,
  BOARD_PATH,
  BOARD_UPDATE_PATH,
  BOARD_WRITE_PATH,
  CALENDAR_INFO_PATH,
  GRADE_INFO_PATH,
  MAIN_PATH,
  MINISTRY_INFO_PATH,
  SEARCH_PATH,
  SMALLGROUP_INFO_PATH,
  SUPPORT_INFO_PATH,
} from "constant";

import Authentication from "views/Authentication";
import BoardWrite from "views/Board/BoardWrite";
// import BoardDetail from "views/Board/BoardDetail";
import BoardUpdate from "views/Board/BoardUpdate";
import Main from "views/Main";
import Header from "layouts/Header";
import Container from "layouts/Container";
import BoardDetail from "views/Board/BoardDetail";
import User from "components/User";
import Search from "views/Search";
import BoardMain from "views/Board/BoardMain";
import GradeInfo from "views/Info/GradeInfo";
import SmallGroupInfo from "views/Info/SmallGroupInfo";
import MinistryInfo from "views/Info/MinistryInfo";
import SupportInfo from "views/Info/SupportInfo";
import Calendar from "views/Calendar";

function App() {
  return (
    <Routes>
      <Route element={<Container />}>
        {/* BoardList */}
        <Route path={MAIN_PATH()} element={<Main />} />

        <Route path={AUTH_PATH()} element={<Authentication />} />
        <Route path={ADMIN_PAGE_PATH()} element={<User />} />
        <Route path={SEARCH_PATH(":searchWord")} element={<Search />} />
        <Route path={GRADE_INFO_PATH()} element={<GradeInfo />} />
        <Route path={SMALLGROUP_INFO_PATH()} element={<SmallGroupInfo />} />
        <Route path={MINISTRY_INFO_PATH()} element={<MinistryInfo />} />
        <Route path={SUPPORT_INFO_PATH()} element={<SupportInfo />} />
        <Route path={CALENDAR_INFO_PATH()} element={<Calendar />} />
        <Route path={BOARD_PATH()}>
          <Route path={BOARD_MAIN_PATH()} element={<BoardMain />} />

          <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
          <Route
            // /board/detail/:boardNumber
            path={BOARD_DETAIL_PATH(":boardNumber")}
            element={<BoardDetail />}
          />
          <Route
            // /board/update/:boardNumber => edit
            path={BOARD_UPDATE_PATH(":boardNumber")}
            element={<BoardUpdate />}
          />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
