import { AUTH_PATH, BOARD_PATH, BOARD_WRITE_PATH, MAIN_PATH } from "constant";
import Header from "layouts/Header";
import { Outlet, useLocation } from "react-router-dom";

export default function Container() {
  // state: 현재 페이지 path name 상태
  const { pathname } = useLocation();

  const isAuthPage = pathname === AUTH_PATH();

  return (
    <>
      <Header />

      <Outlet />
    </>
  );
}
