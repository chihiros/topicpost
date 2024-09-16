package usecase

type Response struct {
	Data          interface{} `json:"data"`
	ErrorResponse `json:"errors"`
}

type ErrorResponse struct {
	ErrorCode    string `json:"code"`
	ErrorMessage string `json:"message"`
}
