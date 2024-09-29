package usecase

import (
	"app/entity"

	"github.com/google/uuid"
)

type UserRepository interface {
	CreateUser(uuid.UUID) (entity.User, error)
}

type UserUsecase struct {
	Repository UserRepository
}

func NewUserUsecase(repo UserRepository) *UserUsecase {
	return &UserUsecase{
		Repository: repo,
	}
}

func (u *UserUsecase) CreateUser(uid uuid.UUID) (entity.User, error) {
	return u.Repository.CreateUser(uid)
}
