enum ResponseCode {
// HTTP Status 200
SUCCESS = "SU",
DUPLICATE_NICKNAME = "DN",
NOT_EXISTED_BOARD = "NB",

// HTTP Status 500
DATABASE_ERROR = "DBE",
}
export default ResponseCode;