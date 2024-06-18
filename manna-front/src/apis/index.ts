import axios, { AxiosRequestConfig } from 'axios';
import ResponseDto from './response';
import { GetBoardResponseDto, PostBoardResponseDto,DeleteBoardResponseDto, UpdateBoardResponseDto, GetSearchBoardListResponseDto} from './response/board';
import { PostBoardRequestDto, UpdateBoardRequestDto } from './request/board';
import BoardListItem from 'types/interface/board-list-item.interface';
import { SignInRequestDto, SignUpRequestDto } from './request/auth';
import { SignUpResponseDto } from './response/auth';
import SignInResponseDto from './response/auth/sign-in.response.dto';
import { useNavigate } from 'react-router-dom';
import { BOARD_DETAIL_PATH, BOARD_PATH } from 'constant';


const DOMAIN = 'http://localhost:4000';
const API_DOMAIN = '/api/v1';
// const API_DOMAIN = `${DOMAIN}/api/v1`;


const SIGN_UP_URL =  () => `${API_DOMAIN}/auth/sign-up`
// auth 부분
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    try {
        const response = await axios.post(SIGN_UP_URL(),requestBody);
        const responseBody: SignUpResponseDto = response.data;
        return responseBody;
    }catch(error){
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) {
                // 유효성 검사 오류 메시지를 포함한 데이터를 반환
                return error.response.data;
            }
            const responseBody: ResponseDto = error.response?.data;
            return responseBody;
        } else {
            throw error; // AxiosError가 아닌 다른 타입의 오류는 다시 던짐
        }
    };
}
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`
export const signInRequest = async (requestBody: SignInRequestDto) => {
   
    try {
        const response = await axios.post(SIGN_IN_URL(),requestBody);
        
        const token = response.data.token;
        if(token) {
            localStorage.setItem('token', token);
            console.log("Token stored : ",token);
        }else {
            console.log(
                "No token received"
            );
        }
        const responseBody: SignInResponseDto = response.data;
        return responseBody;
    }catch(error){
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) {
                // 유효성 검사 오류 메시지를 포함한 데이터를 반환
                return error.response.data;
            }
            const responseBody: ResponseDto = error.response?.data;
            return responseBody;
        } else {
            throw error; // AxiosError가 아닌 다른 타입의 오류는 다시 던짐
        }
    };
}


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

    
    const token = localStorage.getItem('token');
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }) // 토큰이 있는 경우에만 설정
        }
    };
    try {
        const response = await axios.delete(DELETE_BOARD_URL(boardNumber),config);
        const responseBody: DeleteBoardResponseDto = response.data;
        return responseBody;
    }catch(error: any) {
        console.log("error: " + error);
        if(axios.isAxiosError(error) && error.response?.status === 403) {
            alert("글 삭제는 관리자만 가능합니다.");
            
        }
        if (!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        console.log("error.response.data:" + error.response.data);
        return responseBody;
    }
}

const UPDATE_BOARD_URL = (boardNumber:number | string) => `${API_DOMAIN}/board/update/${boardNumber}`;
// 게시물 수정
export const updateBoardRequest = async(boardNumber : number | string, requestBody : UpdateBoardRequestDto) => {
    const token = localStorage.getItem('token');
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }) // 토큰이 있는 경우에만 설정
        }
    };
    try {
        const response = await axios.patch(UPDATE_BOARD_URL(boardNumber), requestBody,config);
        const responseBody : UpdateBoardResponseDto= response.data;
        return responseBody;
    }catch(error: any) {
        console.log("error: " + error);
        if(axios.isAxiosError(error) && error.response?.status === 403) {
            alert("글 수정은 관리자만 가능합니다.");
        }
        if (!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        console.log("error.response.data:" + error.response.data);
        return responseBody;
    }
 
    
}

// 검색 결과 리스트 받아오기
const GET_SEARCH_BOARD_LIST_URL = (searchWord:string, preSearchWord:string| null) => `${API_DOMAIN}/board/search-list/${searchWord}${preSearchWord? '/' : ''}}`;
export const getSearchBoardListRequest = async (searchWord:string, preSearchWord:string | null) => {
    try {
        const response = await axios.get(GET_SEARCH_BOARD_LIST_URL(searchWord, preSearchWord), {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // 토큰을 localStorage (또는 적절한 위치)에서 가져오는 코드
                'Content-Type': 'application/json'
            }
        });
        const responseBody: GetSearchBoardListResponseDto = response.data;
        console.log("responseBody", responseBody);
        return responseBody;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const responseBody: ResponseDto = error.response?.data;
            return responseBody;
        } else {
            throw error; // AxiosError가 아닌 다른 타입의 오류는 다시 던짐
        }
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

