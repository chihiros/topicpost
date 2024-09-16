package usecase

import (
	"context"
)

type ContactUseCase interface {
	PostContact(context.Context, Request) (Response, error)
}

type ContactRepository interface {
	PostContact(context.Context, Request) (Response, error)
}

type ContactUsecase struct {
	Repository ContactRepository
}

func (c *ContactUsecase) PostContact(ctx context.Context, req Request) (Response, error) {
	return c.Repository.PostContact(ctx, req)
}
