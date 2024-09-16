package repository

import (
	"app/ent"
	"app/ent/user"
	"app/middle/applog"
	"app/modules/users/usecase"
	"context"
	"fmt"
	"time"

	"entgo.io/ent/dialect/sql"
	"github.com/google/uuid"
)

type UserRepository struct {
	DBConn *ent.Client
}

func NewUserRepository(conn *ent.Client) *UserRepository {
	return &UserRepository{
		DBConn: conn,
	}
}

func (r *UserRepository) GetUsers(ctx context.Context, uuid uuid.UUID) (usecase.Response, error) {
	p, err := r.DBConn.User.Query().
		Where(user.UserID(uuid)).
		Only(ctx)

	if err != nil {
		// NotFoundだったら
		if ent.IsNotFound(err) {
			return usecase.Response{
					Data: nil,
					ErrorResponse: usecase.ErrorResponse{
						ErrorCode:    "404",
						ErrorMessage: "not found",
					},
				},
				fmt.Errorf("not found")
		}
	}

	if err != nil {
		applog.Panic(err)
	}

	res := usecase.Response{Data: p}
	return res, err
}

func (r *UserRepository) PostUsers(ctx context.Context, req usecase.Request) (usecase.Response, error) {
	user, err := r.DBConn.User.Create().
		SetUserID(req.UserID).
		SetNickname(req.Nickname).
		SetIconURL(req.IconURL).
		SetCreatedAt(time.Now()).
		SetUpdatedAt(time.Now()).
		Save(ctx)

	if err != nil {
		if ent.IsConstraintError(err) {
			// ent側の制約エラー
			return usecase.Response{}, fmt.Errorf("duplicate")
		}
	}

	if err != nil {
		panic(err)
	}

	res := usecase.Response{Data: user}
	return res, err
}

func (r *UserRepository) PutUsers(ctx context.Context, req usecase.Request) (usecase.Response, error) {
	_, err := r.DBConn.User.Create().
		SetUserID(req.UserID).
		SetNickname(req.Nickname).
		SetIconURL(req.IconURL).
		SetCreatedAt(time.Now()).
		SetUpdatedAt(time.Now()).
		OnConflict(
			sql.ConflictColumns(user.FieldUserID),
		).
		Update(func(p *ent.UserUpsert) {
			p.SetNickname(req.Nickname)
			p.SetIconURL(req.IconURL)
			p.SetUpdatedAt(time.Now())
		}).
		ID(ctx)

	if err != nil {
		panic(err)
	}

	// 更新に成功したら、更新後のデータを返す
	user, err := r.DBConn.User.Query().
		Where(user.UserIDEQ(req.UserID)).
		Only(ctx)

	res := usecase.Response{Data: user}
	return res, err
}

func (r *UserRepository) DeleteUsers(ctx context.Context, uuid uuid.UUID) error {
	_, err := r.DBConn.User.Delete().
		Where(user.UserID(uuid)).
		Exec(ctx)

	if err != nil {
		panic(err)
	}

	return err
}
