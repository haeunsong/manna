import axios from 'axios';
import ResponseDto from './response';
import { GetBoardResponseDto, PostBoardResponseDto,DeleteBoardResponseDto, UpdateBoardResponseDto} from './response/board';
import { PostBoardRequestDto, UpdateBoardRequestDto } from './request/board';
import BoardListItem from 'types/interface/board-list-item.interface';

const DOMAIN = 'http://localhost:4000';
const API_DOMAIN = '/api/v1';
// const API_DOMAIN = `${DOMAIN}/api/v1`;

// 특정게시물 조회
const GET_BOARD_URL = (boardNumber: undefined | string) => `${API_DOMAIN}/board/detail/${boardNumber}`;

export const getBoardDetailRequest = async (boardNumber: undefined | string) => {
    const result = await axios.get(GET_BOARD_URL(boardNumber))
        .then(response => {
            const responseBody: GetBoardResponseDto = response.data;
            console.log("responseBody", responseBody);
            return responseBody;

        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            console.log(responseBody);
            return responseBody;

        })
    return result;
}

// http://localhost:4000/api/v1/board/post
const POST_BOARD_URL = () => `${API_DOMAIN}/board/post`;

export const postBoardRequest = async (requestBody: PostBoardRequestDto) => {
    console.log("postBoardRequest 호출");

    const result = await axios.post(POST_BOARD_URL(), requestBody)
        .then(response => {
            console.log("response.data" + response.data);
            const responseBody: PostBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            // 존재하지 않는다면
            console.log("error: " + error);
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            console.log("error.response.data:" + error.response.data);
            return responseBody;
        })
        console.log("글 게시물 post 완료");
            return result;
}

const DELETE_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/detail/${boardNumber}`;

// 게시물 삭제 
export const deleteBoardRequest = async(boardNumber: number | string) => {
    try {
        const response = await axios.delete(DELETE_BOARD_URL(boardNumber));
        const responseBody: DeleteBoardResponseDto = response.data;
        return responseBody;
    }catch(error: any) {
        console.log("error: " + error);
        if (!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        console.log("error.response.data:" + error.response.data);
        return responseBody;
    }
}

const UPDATE_BOARD_URL = (boardNumber:number | string) => `${API_DOMAIN}/board/update/${boardNumber}`;
// 게시물 수정
export const updateBoardRequest = async(boardNumber : number | string, requestBody : UpdateBoardRequestDto) => {
    try {
        const response = await axios.patch(UPDATE_BOARD_URL(boardNumber), requestBody);
        const responseBody : UpdateBoardResponseDto= response.data;
        return responseBody;
    }catch(error: any) {
        console.log("error: " + error);
        if (!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        console.log("error.response.data:" + error.response.data);
        return responseBody;
    }
 
    
}

// http://localhost:4000/file
const FILE_DOMAIN = `${DOMAIN}/file`;

// http://localhost:4000/file/upload
const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

// 서버로 파일 업로드 요청을 보낼 때 필요한 헤더이다.
// 이 헤더를 포함하여 요청을 보내면, 해당 요청은 'multipart/form-data' 형식으로 전송된다.
const multipartFormData = { headers: { 'Content-Type': 'multipart/form-data' } };

export const fileUploadRequest = async (data: FormData) => {
    
    const result = await axios.post(FILE_UPLOAD_URL(), data, multipartFormData)
        .then(response => {
            // fileController 보면 문자열로 받아온다.
            const responseBody: string = response.data;
            return responseBody;
        })
        .catch(error => {
            return null;
        })
    return result;
}

