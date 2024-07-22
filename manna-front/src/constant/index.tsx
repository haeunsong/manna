export const MAIN_PATH = () => "/";
export const AUTH_PATH = () => "/auth";
export const ADMIN_PAGE_PATH = () => "/admin/index";
export const SIGN_UP_PATH = () => "/auth/sign-up";
export const SIGN_IN_PATH = () => "/auth/sign-in";

export const SEARCH_PATH = (searchWord: string) => `search/${searchWord}`;
//export const USER_PATH = (userEmail: string) => `/user/${userEmail}`;
export const BOARD_PATH = () => "/board";
export const BOARD_MAIN_PATH = () => "/board/index";
export const BOARD_DETAIL_PATH = (boardNumber: string | number) =>
  `detail/${boardNumber}`;
export const BOARD_WRITE_PATH = () => "write";
export const BOARD_UPDATE_PATH = (boardNumber: string | number) =>
  `update/${boardNumber}`;

export const TODAY_BIBLE_PATH = () => "/bible/today";

export const GRADE_INFO_PATH = () => "/grade/index"; // 학년소개 페이지
export const SMALLGROUP_INFO_PATH = () => "/smallgroup/index"; // 소모임 페이지
export const MINISTRY_INFO_PATH = () => "ministry/index"; // 사역팀 페이지
export const SUPPORT_INFO_PATH = () => "support/index"; // 후원 페이지
export const CALENDAR_INFO_PATH = () => "calendar/index"; // 일정 페이지
