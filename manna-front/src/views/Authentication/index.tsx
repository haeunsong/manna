import React, { ChangeEvent, useState } from "react";
import "./style.css";
import { SignInRequestDto, SignUpRequestDto } from "apis/request/auth";
import { signInRequest, signUpRequest } from "apis";
import { SignUpResponseDto } from "apis/response/auth";
import ResponseDto from "apis/response";
import SignInResponseDto from "apis/response/auth/sign-in.response.dto";
import { useNavigate } from "react-router-dom";
import { ADMIN_PAGE_PATH } from "constant";

export default function Authentication() {
  const navigate = useNavigate();
  const [view, setView] = useState<"sign-in" | "sign-up">("sign-in");

  // Sign in
  const SignInCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      setErrors({ ...errors, email: "" });
    };
    const onPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setErrors({ ...errors, password: "" });
    };
    const onSignUpClick = () => {
      setView("sign-up");
    };
    const onClickSignInHandler = () => {
      if (!validateForm()) return;
      // 로그인 로직
      const requestBody: SignInRequestDto = { email, password };
      signInRequest(requestBody).then(signInResponse);
    };
    const validateForm = () => {
      let formIsValid = true;
      const newErrors: { [key: string]: string } = {};

      if (!email) {
        formIsValid = false;
        newErrors.email = "이메일을 입력하세요.";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        formIsValid = false;
        newErrors.email = "유효한 이메일 형식이 아닙니다.";
      }

      if (!password) {
        formIsValid = false;
        newErrors.password = "비밀번호를 입력하세요.";
      } else if (password.length < 8) {
        formIsValid = false;
        newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
      }
      setErrors(newErrors);
      return formIsValid;
    };
    // function: signInResponse 처리 함수
    const signInResponse = (
      responseBody: SignInResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) {
        alert("네트워크 이상입니다.");
        return;
      }
      const { code } = responseBody;

      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code === "SU") {
        alert("로그인 완료!");
        navigate(ADMIN_PAGE_PATH());
      } else {
        alert("비밀번호가 일치하지 않습니다.");
        setPassword("");
      }

      // /admin/index
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
              {errors.email && (
                <p className="error-message" style={{ color: "red" }}>
                  {errors.email}
                </p>
              )}
              <div className="input-label">비밀번호</div>
              <input
                name="password"
                type="password"
                value={password}
                onChange={onPasswordChangeHandler}
                placeholder="비밀번호를 입력하세요."
              />
              {errors.password && (
                <p className="error-message" style={{ color: "red" }}>
                  {errors.password}
                </p>
              )}
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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      setErrors({ ...errors, email: "" });
    };
    const onPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setErrors({ ...errors, password: "" });
    };
    const onCheckPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setCheckPassword(e.target.value);
      setErrors({ ...errors, checkPassword: "" });
    };
    const onNicknameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
      setErrors({ ...errors, nickname: "" });
    };

    const onSignInClick = () => {
      setView("sign-in");
    };
    const validateForm = () => {
      let formIsValid = true;
      const newErrors: { [key: string]: string } = {};

      if (!email) {
        formIsValid = false;
        newErrors.email = "이메일을 입력하세요.";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        formIsValid = false;
        newErrors.email = "유효한 이메일 형식이 아닙니다.";
      }

      if (!password) {
        formIsValid = false;
        newErrors.password = "비밀번호를 입력하세요.";
      }

      if (password !== checkPassword) {
        formIsValid = false;
        newErrors.checkPassword = "비밀번호가 일치하지 않습니다.";
        setPassword("");
        setCheckPassword("");
      }

      if (!nickname) {
        formIsValid = false;
        newErrors.nickname = "닉네임을 입력하세요.";
      }

      setErrors(newErrors);
      return formIsValid;
    };

    const onClickSignUpHandler = () => {
      if (!validateForm()) return;
      // 회원가입 로직

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
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              <div className="input-label">비밀번호</div>
              <input
                name="password"
                type="password"
                value={password}
                onChange={onPasswordChangeHandler}
                placeholder="비밀번호를 입력하세요."
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
              <div className="input-label">비밀번호 확인</div>
              <input
                name="passwordCheck"
                type="password"
                value={checkPassword}
                onChange={onCheckPasswordChangeHandler}
                placeholder="비밀번호를 다시 입력하세요."
              />
              {errors.checkPassword && (
                <p style={{ color: "red" }}>{errors.checkPassword}</p>
              )}
              <div className="input-label">닉네임</div>
              <input
                name="nickname"
                type="text"
                value={nickname}
                onChange={onNicknameChangeHandler}
                placeholder="닉네임을 입력하세요."
              />
              {errors.nickname && (
                <p style={{ color: "red" }}>{errors.nickname}</p>
              )}
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
