import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  AUTH_PATH,
  BOARD_DETAIL_PATH,
  BOARD_PATH,
  BOARD_UPDATE_PATH,
  BOARD_WRITE_PATH,
  MAIN_PATH,
} from "constant";

import Authentication from "views/Authentication";
import User from "views/User";
import BoardWrite from "views/Board/BoardWrite";
// import BoardDetail from "views/Board/BoardDetail";
import BoardUpdate from "views/Board/BoardUpdate";
import Main from "views/Main";
import Header from "layouts/Header";
import Container from "layouts/Container";
import BoardDetail from "views/Board/BoardDetail";

function App() {
  return (
    <Routes>
      <Route element={<Container />}>
        {/* BoardList */}
        <Route path={MAIN_PATH()} element={<Main />} />
        <Route path={AUTH_PATH()} element={<Authentication />} />

        <Route path={BOARD_PATH()}>
          {/* /board/write */}
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
