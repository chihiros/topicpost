package controller

import (
	"app/interface/repository"
	"app/middle/applog"
	"app/usecase"
	"encoding/json"
	"net/http"
)

type UserController struct {
	Usecase *usecase.UserUsecase
}

func NewUserController() *UserController {
	u := NewUserUsecase()
	return &UserController{
		Usecase: u,
	}
}

func NewUserUsecase() *usecase.UserUsecase {
	repo := repository.NewUserRepository()
	return &usecase.UserUsecase{
		Repository: repo,
	}
}

func (uc *UserController) CreateUser(w http.ResponseWriter, r *http.Request) {
	// POSTのBodyを読み込む
	req := usecase.UserRequest{}

	// リクエストのBodyをJSONに変換
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		applog.Warn(err.Error())
		return
	}

	res, err := uc.Usecase.CreateUser(req.UID)
	if err != nil {
		applog.Warn(err.Error())
		return
	}

	// リクエストが正常に処理された場合のレスポンス
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(res)
}
