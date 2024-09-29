package usecase

import "github.com/google/uuid"

type UserRepository interface {
	CreateUser(uuid.UUID) (UserResponse, error)
}

type UserUsecase struct {
	Repository UserRepository
}

func NewUserUsecase(repo UserRepository) *UserUsecase {
	return &UserUsecase{
		Repository: repo,
	}
}

func (u *UserUsecase) CreateUser(uid uuid.UUID) (UserResponse, error) {
	return u.Repository.CreateUser(uid)
}
