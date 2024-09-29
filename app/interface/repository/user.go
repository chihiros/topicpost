package repository

import (
	"app/entity"
	"time"

	"github.com/google/uuid"
)

type UserRepository struct {
}

func NewUserRepository() *UserRepository {
	return &UserRepository{}
}

func (ur *UserRepository) CreateUser(uid uuid.UUID) (entity.User, error) {
	return entity.User{
		ID:        1,
		UID:       uid,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}, nil
}
