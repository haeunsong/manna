import React, { useState, useEffect } from "react";
import axios from "axios";
import { GetSignInUserResponseDto } from "apis/response/auth";
import ResponseDto from "apis/response";
import "./style.css";

export default function User() {
  const [user, setUser] = useState<GetSignInUserResponseDto | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchUserInfoRequest();
  }, []);

  const fetchUserInfoRequest = async () => {
    // jwt 토큰을 로컬 스토리지에서 가져온다.
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      console.log(error);
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/index",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseBody: GetSignInUserResponseDto = response.data;
      setUser(responseBody);
    } catch (error: any) {
      alert("유저 정보 불러오기에 실패했습니다.");
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;

      console.log("error.response.data: ", error.response.data);
      setError(responseBody.message || "Failed to fetch user information");
    }
  };

  return (
    <div>
      {user ? (
        <div id="wrapper">
          <h1>로그인 유저 정보</h1>
          <br />
          <div className="user-email">
            <div className="label"> 이메일 :&ensp;</div>
            <div className="info"> {user.email}</div>
          </div>

          <div className="user-email">
            <div className="label"> 닉네임 :&ensp; </div>
            <div className="info"> {user.nickname}</div>
          </div>
          <div className="user-email">
            <div className="label"> 역할 :&ensp; </div>
            <div className="info">
              {" "}
              {user.role === "ROLE_ADMIN" ? "관리자" : "없음"}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          유저가 존재하지 않습니다. 관리자인 경우 관리자로 로그인 하십시오.
        </div>
      )}
    </div>
  );
}
