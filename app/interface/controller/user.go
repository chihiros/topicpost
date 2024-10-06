package controller

import (
	"app/interface/model"
	"app/middle/applog"
	"app/usecase"
	"encoding/json"
	"fmt"
	"net/http"
)

type UserController struct {
	Usecase *usecase.UserUsecase
}

func NewUserController(u *usecase.UserUsecase) *UserController {
	return &UserController{
		Usecase: u,
	}
}

func (uc *UserController) CreateUser(w http.ResponseWriter, r *http.Request) {
	req := model.UserRequest{}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		applog.Warn(err.Error())
		return
	}

	res, err := uc.Usecase.CreateUser(r.Context(), req.UID)
	if err != nil {
		applog.Warn(err.Error())

		// dial tcp: lookup supabase_db_supabase-local on 127.0.0.11:53: no such host
		// というエラーが出た場合は正規表現で判断して503を返す

		fmt.Printf("%#v\n", err)

		errorResponse := model.ErrorResponse{
			Message: err.Error(),
		}

		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(errorResponse)
		return
	}

	resBody := model.UserResponse{
		ID:        res.ID,
		UID:       res.UID,
		CreatedAt: res.CreatedAt,
		UpdatedAt: res.UpdatedAt,
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(resBody)
}
