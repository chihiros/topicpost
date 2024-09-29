package repository

import (
	"app/ent"
	"app/entity"
	"time"

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

func (ur *UserRepository) CreateUser(uid uuid.UUID) (entity.User, error) {
	return entity.User{
		ID:        1,
		UID:       uid,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}, nil
}
