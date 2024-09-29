package repository

import (
	"app/usecase"
	"time"

	"github.com/google/uuid"
)

type UserRepository struct {
}

func NewUserRepository() *UserRepository {
	return &UserRepository{}
}

func (ur *UserRepository) CreateUser(uid uuid.UUID) (usecase.UserResponse, error) {
	return usecase.UserResponse{
		ID:        1,
		UID:       uid,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}, nil
}
