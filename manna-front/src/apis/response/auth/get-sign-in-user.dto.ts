import ResponseDto from "..";

export default interface GetSignInUserResponseDto extends ResponseDto {
     email: String;
     nickname: String;
     role: String;

}