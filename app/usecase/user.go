package usecase

import (
	"app/entity"
	"context"

	"github.com/google/uuid"
)

type UserRepository interface {
	CreateUser(context.Context, uuid.UUID) (entity.User, error)
	GetUsers(context.Context) ([]entity.User, error)
}

type UserUsecase struct {
	Repository UserRepository
}

func NewUserUsecase(repo UserRepository) *UserUsecase {
	return &UserUsecase{
		Repository: repo,
	}
}

func (u *UserUsecase) CreateUser(ctx context.Context, uid uuid.UUID) (entity.User, error) {
	return u.Repository.CreateUser(ctx, uid)
}

func (u *UserUsecase) GetUsers(ctx context.Context) ([]entity.User, error) {
	return u.Repository.GetUsers(ctx)
}
