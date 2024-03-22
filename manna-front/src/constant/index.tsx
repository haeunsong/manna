export const MAIN_PATH = () => "/"; // 여기에 카드형식으로 글 목록보임
export const AUTH_PATH = () => "/auth";
export const SEARCH_PATH = (searchWord: string) => `search/${searchWord}`;
export const USER_PATH = (userEmail: string) => `/user/${userEmail}`;
export const BOARD_PATH = () => "/board";
export const BOARD_DETAIL_PATH = (boardNumber: string | number) =>
  `detail/${boardNumber}`;
export const BOARD_WRITE_PATH = () => "write";
export const BOARD_UPDATE_PATH = (boardNumber: string | number) =>
  `update/${boardNumber}`;
