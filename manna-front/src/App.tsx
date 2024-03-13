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
  USER_PATH,
} from "constant";
import Main from "views/Main";
import Authentication from "views/Authentication";
import User from "views/User";
import BoardWrite from "views/Board/BoardWrite";
import BoardDetail from "views/Board/BoardDetail";
import BoardUpdate from "views/Board/BoardUpdate";

function App() {
  return (
    <Routes>
      <Route path={MAIN_PATH()} element={<Main />} />
      <Route path={AUTH_PATH()} element={<Authentication />} />
      <Route path={USER_PATH(":userEmail")} element={<User />} />

      <Route path={BOARD_PATH()}>
        <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
        <Route
          path={BOARD_DETAIL_PATH(":boardNumber")}
          element={<BoardDetail />}
        />
        <Route
          path={BOARD_UPDATE_PATH(":boardNumber")}
          element={<BoardUpdate />}
        />
      </Route>
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
