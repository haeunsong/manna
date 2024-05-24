import React, { ChangeEvent, useState } from "react";
import "./style.css";
import { SignInRequestDto, SignUpRequestDto } from "apis/request/auth";
import { signInRequest, signUpRequest } from "apis";
import { SignUpResponseDto } from "apis/response/auth";
import ResponseDto from "apis/response";

export default function Authentication() {
  const [view, setView] = useState<"sign-in" | "sign-up">("sign-in");

  // Sign in
  const SignInCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };
    const onPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };
    const onSignUpClick = () => {
      setView("sign-up");
    };
    const onClickSignInHandler = () => {
      // 로그인 로직
      const requestBody: SignInRequestDto = { email, password };
      signInRequest(requestBody).then(signInResponse);
    };
    const signInResponse = () => {};
    return (
      <div>
        <div className="auth-card">
          <div className="auth-card-box">
            <div className="auth-card-top">
              <h2>로그인</h2>
            </div>
            <div className="auth-card-middle">
              <div className="input-label">이메일</div>
              <input
                name="email"
                type="text"
                value={email}
                onChange={onEmailChangeHandler}
                placeholder="이메일 주소를 입력하세요."
              />
              <div className="input-label">비밀번호</div>
              <input
                name="password"
                type="password"
                value={password}
                onChange={onPasswordChangeHandler}
                placeholder="비밀번호를 입력하세요."
              />
            </div>
            <div className="auth-card-bottom">
              <button onClick={onClickSignInHandler}>로그인</button>
              <div className="question">
                신규 사용자이신가요?{" "}
                <span onClick={onSignUpClick}> 회원가입</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Sign up
  const SignUpCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [nickname, setNickname] = useState("");

    const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };
    const onPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };
    const onCheckPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setCheckPassword(e.target.value);
    };
    const onNicknameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
    };

    const onSignInClick = () => {
      setView("sign-in");
    };

    const onClickSignUpHandler = () => {
      // 회원가입 로직
      // 비밀번호 일치한지 확인
      const isEqualPassword = password === checkPassword;
      if (!isEqualPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        setPassword("");
        setCheckPassword("");
      }
      const requestBody: SignUpRequestDto = {
        email,
        password,
        nickname,
        role: "ROLE_ADMIN", // 관리자 역할 부여
      };

      signUpRequest(requestBody).then(signUpResponse);
    };
    // function: signUpResponse 처리 함수
    const signUpResponse = (
      responseBody: SignUpResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) {
        alert("네트워크 이상입니다.");
        return;
      }
      const { code } = responseBody;

      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code === "SU") {
        alert(
          "정상적으로 회원가입이 완료되었습니다. 다시 로그인 해주시길 바랍니다. "
        );
      } else {
        alert("오류발생");
      }

      setView("sign-in");
    };
    return (
      <div>
        <div className="auth-card">
          <div className="auth-card-box">
            <div className="auth-card-top">
              <h2>회원가입</h2>
            </div>
            <div className="auth-card-middle">
              <div className="input-label">이메일</div>
              <input
                name="email"
                type="text"
                value={email}
                onChange={onEmailChangeHandler}
                placeholder="이메일 주소를 입력하세요."
              />
              <div className="input-label">비밀번호</div>
              <input
                name="password"
                type="password"
                value={password}
                onChange={onPasswordChangeHandler}
                placeholder="비밀번호를 입력하세요."
              />
              <div className="input-label">비밀번호 확인</div>
              <input
                name="passwordCheck"
                type="password"
                value={checkPassword}
                onChange={onCheckPasswordChangeHandler}
                placeholder="비밀번호를 다시 입력하세요."
              />
              <div className="input-label">닉네임</div>
              <input
                name="nickname"
                type="text"
                value={nickname}
                onChange={onNicknameChangeHandler}
                placeholder="닉네임을 입력하세요."
              />
            </div>
            <div className="auth-card-bottom">
              <button onClick={onClickSignUpHandler}>회원가입</button>
              <div className="question">
                이미 계정이 있으신가요?{" "}
                <span onClick={onSignInClick}> 로그인</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="auth-wrapper">
      <div className="auth-container">
        {view === "sign-in" && <SignInCard />}
        {view === "sign-up" && <SignUpCard />}
      </div>
    </div>
  );
}
