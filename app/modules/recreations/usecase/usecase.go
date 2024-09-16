package usecase

import (
	"context"

	"github.com/google/uuid"
)

type RecreationUseCase interface {
	GetRecreations(context.Context, uuid.UUID, int, int) (Response, error)
	// PostRecreations(context.Context, Request) (Response, error)
	// DeleteRecreationsByID(context.Context, int) error
	GetRecreationsDraft(context.Context, uuid.UUID, int, int) (Response, error)
	GetRecreationsDraftByID(context.Context, uuid.UUID, uuid.UUID) (Response, error)
	PutRecreationsDraft(context.Context, Request) (Response, error)
	PutRecreation(context.Context, Request) (Response, error)
}

type RecreationRepository interface {
	GetRecreations(context.Context, uuid.UUID, int, int) (Response, error)
	// PostRecreations(context.Context, Request) (Response, error)
	// DeleteRecreationsByID(context.Context, int) error
	GetRecreationsDraft(context.Context, uuid.UUID, int, int) (Response, error)
	GetRecreationsDraftByID(context.Context, uuid.UUID, uuid.UUID) (Response, error)
	PutRecreationsDraft(context.Context, Request) (Response, error)
	PutRecreation(context.Context, Request) (Response, error)
}

type RecreationUsecase struct {
	Repository RecreationRepository
}

func (u *RecreationUsecase) GetRecreations(ctx context.Context, rec_id uuid.UUID, limit, offset int) (Response, error) {
	return u.Repository.GetRecreations(ctx, rec_id, limit, offset)
}

// func (u *RecreationUsecase) PostRecreations(ctx context.Context, req Request) (Response, error) {
// 	return u.Repository.PostRecreations(ctx, req)
// }

// func (u *RecreationUsecase) DeleteRecreationsByID(ctx context.Context, id int) error {
// 	return u.Repository.DeleteRecreationsByID(ctx, id)
// }

func (u *RecreationUsecase) GetRecreationsDraft(ctx context.Context, user_id uuid.UUID, limit, offset int) (Response, error) {
	return u.Repository.GetRecreationsDraft(
		ctx,
		user_id,
		limit,
		offset,
	)
}

func (u *RecreationUsecase) GetRecreationsDraftByID(ctx context.Context, rec_id, user_id uuid.UUID) (Response, error) {
	return u.Repository.GetRecreationsDraftByID(
		ctx,
		rec_id,
		user_id,
	)
}

func (u *RecreationUsecase) PutRecreationsDraft(ctx context.Context, req Request) (Response, error) {
	return u.Repository.PutRecreationsDraft(ctx, req)
}

func (u *RecreationUsecase) PutRecreation(ctx context.Context, req Request) (Response, error) {
	return u.Repository.PutRecreation(ctx, req)
}
