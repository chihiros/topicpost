package controller

import (
	"app/ent"
	"app/middle/applog"
	"app/middle/authrization"
	"app/modules/users/interfaces/repository"
	"app/modules/users/usecase"
	"context"
	"encoding/json"
	"errors"
	"net/http"

	"github.com/google/uuid"
)

type UserController struct {
	Usecase usecase.UserUseCase
}

func NewUserController(conn *ent.Client) *UserController {
	u := NewUserUsecase(conn)
	return &UserController{
		Usecase: u,
	}
}

func NewUserUsecase(conn *ent.Client) *usecase.UserUsecase {
	repo := repository.NewUserRepository(conn)
	return &usecase.UserUsecase{
		Repository: repo,
	}
}

func getUUIDWithPayload(r *http.Request) uuid.UUID {
	payload, ok := r.Context().Value(authrization.PayloadKey).(*authrization.SupabaseJwtPayload)
	if !ok {
		applog.Panic(errors.New("Invalid user payload"))
	}
	return uuid.MustParse(payload.Subject)
}

func getPayload(r *http.Request) *authrization.SupabaseJwtPayload {
	payload, ok := r.Context().Value(authrization.PayloadKey).(*authrization.SupabaseJwtPayload)
	if !ok {
		applog.Panic(errors.New("Invalid user payload"))
	}
	return payload
}

func (c *UserController) GetUsers(w http.ResponseWriter, r *http.Request) {
	uuid := getUUIDWithPayload(r)
	users, err := c.Usecase.GetUsers(context.Background(), uuid)
	if err != nil {
		if err.Error() == "not found" {
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(users)
			return
		}

		applog.Panic(err)
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}

func (c *UserController) PostUsers(w http.ResponseWriter, r *http.Request) {
	// bodyの中身をbindする
	req := usecase.Request{}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		applog.Panic(err)
	}

	// jwtのplayloadからuser_idを取得
	payload := getPayload(r)

	// Request.UUIDを上書きする
	uuid, err := uuid.Parse(payload.Subject)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode("Unauthorized")
		return
	}

	req.UserID = uuid
	req.IconURL = payload.UserMetadata.AvatarURL
	if payload.UserMetadata.UserName != "" {
		req.Nickname = payload.UserMetadata.UserName
	} else if payload.UserMetadata.PreferredUsername != "" {
		req.Nickname = payload.UserMetadata.PreferredUsername
	} else if payload.UserMetadata.Name != "" {
		req.Nickname = payload.UserMetadata.Name
	} else if payload.UserMetadata.FullName != "" {
		req.Nickname = payload.UserMetadata.FullName
	} else {
		req.Nickname = ""
	}
	user, err := c.Usecase.PostUsers(context.Background(), req)

	if err != nil {
		switch err.Error() {
		case "duplicate":
			w.WriteHeader(http.StatusConflict)
			json.NewEncoder(w).Encode(user)
		default:
			applog.Panic(err)
		}
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}

func (c *UserController) PutUsers(w http.ResponseWriter, r *http.Request) {
	// bodyの中身をbindする
	req := usecase.Request{}
	err := json.NewDecoder(r.Body).Decode(&req)

	// Request.UserIDを上書きする
	req.UserID = getUUIDWithPayload(r)

	user, err := c.Usecase.PutUsers(context.Background(), req)

	if err != nil {
		switch err.Error() {
		case "duplicate":
			w.WriteHeader(http.StatusConflict)
			json.NewEncoder(w).Encode(user)
		default:
			applog.Panic(err)
		}
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}

func (c *UserController) DeleteUsers(w http.ResponseWriter, r *http.Request) {
	uuid := getUUIDWithPayload(r)
	user := c.Usecase.DeleteUsers(context.Background(), uuid)

	w.WriteHeader(http.StatusNoContent)
	json.NewEncoder(w).Encode(user)
}
