package usecase

type Request struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Content string `json:"content"`
}
