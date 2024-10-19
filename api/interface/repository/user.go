package repository

import (
	"app/ent"
	"app/entity"
	"context"

	"github.com/google/uuid"
)

type UserRepository struct {
	conn *ent.Client
}

func NewUserRepository(conn *ent.Client) *UserRepository {
	return &UserRepository{
		conn: conn,
	}
}

func (ur *UserRepository) CreateUser(ctx context.Context, uid uuid.UUID) (entity.User, error) {
	user, err := ur.conn.User.Create().
		SetUID(uid).
		Save(ctx)

	if err != nil {
		return entity.User{}, err
	}

	return entity.User{
		ID:        user.ID,
		UID:       user.UID,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}, nil
}

func (ur *UserRepository) GetUsers(ctx context.Context) ([]entity.User, error) {
	users, err := ur.conn.User.Query().
		All(ctx)

	if err != nil {
		return nil, err
	}

	var res []entity.User
	for _, user := range users {
		res = append(res, entity.User{
			ID:        user.ID,
			UID:       user.UID,
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
		})
	}

	return res, nil
}
