package controller

import (
	"app/middle/applog"
	"app/usecase"
	"encoding/json"
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
	req := usecase.UserRequest{}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		applog.Warn(err.Error())
		return
	}

	res, err := uc.Usecase.CreateUser(r.Context(), req.UID)
	if err != nil {
		applog.Warn(err.Error())
		return
	}

	resBody := usecase.UserResponse{
		ID:        res.ID,
		UID:       res.UID,
		CreatedAt: res.CreatedAt,
		UpdatedAt: res.UpdatedAt,
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(resBody)
}
