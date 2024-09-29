package usecase

import "github.com/google/uuid"

type UserRepository interface {
	CreateUser(uuid.UUID) (UserResponse, error)
}

type UserUsecase struct {
	Repository UserRepository
}

func (u *UserUsecase) CreateUser(uid uuid.UUID) (UserResponse, error) {
	return u.Repository.CreateUser(uid)
}
