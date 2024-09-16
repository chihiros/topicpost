package usecase

import (
	"context"

	"github.com/google/uuid"
)

type UserUseCase interface {
	GetUsers(context.Context, uuid.UUID) (Response, error)
	PostUsers(context.Context, Request) (Response, error)
	PutUsers(context.Context, Request) (Response, error)
	DeleteUsers(context.Context, uuid.UUID) error
}

type UserRepository interface {
	GetUsers(context.Context, uuid.UUID) (Response, error)
	PostUsers(context.Context, Request) (Response, error)
	PutUsers(context.Context, Request) (Response, error)
	DeleteUsers(context.Context, uuid.UUID) error
}

type UserUsecase struct {
	Repository UserRepository
}

func (u *UserUsecase) GetUsers(ctx context.Context, uuid uuid.UUID) (Response, error) {
	return u.Repository.GetUsers(ctx, uuid)
}

func (u *UserUsecase) PostUsers(ctx context.Context, req Request) (Response, error) {
	return u.Repository.PostUsers(ctx, req)
}

func (u *UserUsecase) PutUsers(ctx context.Context, req Request) (Response, error) {
	return u.Repository.PutUsers(ctx, req)
}

func (u *UserUsecase) DeleteUsers(ctx context.Context, uuid uuid.UUID) error {
	return u.Repository.DeleteUsers(ctx, uuid)
}
