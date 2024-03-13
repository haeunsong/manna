import React, { ChangeEvent, useState } from "react";
import "./style.css";

export default function Authentication() {
  const [view, setView] = useState<"sign-in" | "sign-up">("sign-up");

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
              <button>로그인</button>
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
    const [authNumber, setAuthNumber] = useState("");

    const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };
    const onPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };
    const onCheckPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setCheckPassword(e.target.value);
    };
    const onAuthNumberChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setAuthNumber(e.target.value);
    };

    const onSignInClick = () => {
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
              <div className="input-label">인증번호</div>
              <input
                name="authNumber"
                type="text"
                value={authNumber}
                onChange={onAuthNumberChangeHandler}
                placeholder="비밀번호를 다시 입력하세요."
              />
            </div>
            <div className="auth-card-bottom">
              <button>회원가입</button>
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
