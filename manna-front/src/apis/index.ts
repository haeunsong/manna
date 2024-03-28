import axios from 'axios';
import PostBoardRequestDto from './request/board';
import PostBoardResponseDto from './response/board';
import ResponseDto from './response';
import { request } from 'http';

const DOMAIN = 'http://localhost:4000';
const API_DOMAIN = `${DOMAIN}/api/v1`;

// http://localhost:4000/api/v1/board/post
const POST_BOARD_URL = () => `${API_DOMAIN}/board/post`;
 
export const postBoardRequest = async (requestBody: PostBoardRequestDto) => {
    console.log("postBoardRequest() 호출!");
    console.log("requestBody: "+requestBody);
    // 여기서 CORS 오류 발생!
    const result = await axios.post(POST_BOARD_URL(), requestBody)
        .then(response=> {
            console.log("response.data"+response.data);
            const responseBody : PostBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            // 존재하지 않는다면
            console.log("error: " +error);
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            console.log("error.response.data:"+error.response.data);
            return responseBody;
        })
        return result;
}
// http://localhost:4000/file
const FILE_DOMAIN = `${DOMAIN}/file`;

// http://localhost:4000/file/upload
const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

// 서버로 파일 업로드 요청을 보낼 때 필요한 헤더이다.
// 이 헤더를 포함하여 요청을 보내면, 해당 요청은 'multipart/form-data' 형식으로 전송된다.
const multipartFormData = {headers: {'Content-Type': 'multipart/form-data'}};

export const fileUploadRequest = async (data: FormData) => {
    const result = await axios.post(FILE_UPLOAD_URL(), data, multipartFormData)
    .then(response => {
        // fileController 보면 문자열로 받아온다.
        const responseBody : string = response.data;
        return responseBody;
    })
    .catch(error => {
        return null;
    })
    return result;
}
