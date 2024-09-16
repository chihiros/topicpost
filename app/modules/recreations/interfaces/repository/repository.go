package repository

import (
	"app/ent"
	"app/ent/recreation"
	"app/ent/user"
	"app/middle/applog"
	"app/modules/recreations/usecase"
	"context"
	"time"

	"github.com/google/uuid"
)

type RecreationRepository struct {
	DBConn *ent.Client
}

func NewRecreationRepository(conn *ent.Client) *RecreationRepository {
	return &RecreationRepository{
		DBConn: conn,
	}
}

type RecreationResponse struct {
	Recreations  []*ent.Recreation `json:"recreations"`
	TotalRecords int               `json:"total_records"`
}

func (r *RecreationRepository) GetRecreations(ctx context.Context, rec_id uuid.UUID, limit, offset int) (usecase.Response, error) {
	// count all records first
	count, err := r.DBConn.Recreation.
		Query().
		Where(recreation.PublishEQ(true)). // 公開されているものだけを取得
		Count(ctx)
	if err != nil {
		applog.Panic(err)
	}

	// then fetch paged records
	query := r.DBConn.Recreation.
		Query().
		Order(ent.Desc(recreation.FieldCreatedAt)).
		Where(recreation.PublishEQ(true)). // 公開されているものだけを取得
		Limit(limit).
		Offset(offset)

	if rec_id != uuid.Nil {
		query = query.Where(recreation.RecreationIDEQ(rec_id))
	}

	recreation, err := query.All(ctx)

	if err != nil {
		applog.Panic(err)
	}

	stack := make(map[uuid.UUID]*ent.User)
	for _, rec := range recreation {
		if _, ok := stack[rec.UserID]; !ok {
			user, err := r.DBConn.User.Query().
				Where(user.UserIDEQ(rec.UserID)).
				First(ctx)

			if err != nil {
				applog.Panic(err)
			}
			stack[rec.UserID] = user
		}
		rec.Edges.Users = stack[rec.UserID]
	}

	recRes := RecreationResponse{
		Recreations:  recreation,
		TotalRecords: count,
	}

	res := usecase.Response{
		Data: recRes,
	}
	return res, err
}

// func (r *RecreationRepository) PostRecreations(ctx context.Context, req usecase.Request) (usecase.Response, error) {
// 	_, err := r.DBConn.Recreation.Create().
// 		SetUserID(req.UserID).
// 		SetRecreationID(req.RecreationID).
// 		SetGenre(req.Genre).
// 		SetTitle(req.Title).
// 		SetContent(req.Content).
// 		SetYoutubeID(req.YouTubeID).
// 		SetTargetNumber(req.TargetNumber).
// 		SetRequiredTime(req.RequiredTime).
// 		SetPublish(true).
// 		SetCreatedAt(time.Now()).
// 		SetUpdatedAt(time.Now()).
// 		SetPublishedAt(time.Now()).
// 		Save(ctx)
// 		// ↓ 本当はこの用にUpsertを実装したいんだけど、entのバグ？仕様上で[]intの配列が正常に保存できないみたいなので
// 		// 　Insertをしてみてコンフリクトが起きたらUpdateするようにする
// 		// OnConflict(
// 		// 	sql.ConflictColumns(
// 		// 		recreation.FieldUserID,
// 		// 		recreation.FieldRecreationID,
// 		// 	),
// 		// ).
// 		// Update(func(ru *ent.RecreationUpsert) {
// 		// 	ru.UpdateGenre().Set(
// 		// 		recreation.FieldGenre,
// 		// 		req.Genre,
// 		// 	)

// 		// 	// // r.SetGenre(req.Genre)
// 		// 	// ru.SetGenre([]int{1, 2, 3})
// 		// 	ru.SetTitle(req.Title)
// 		// 	ru.SetContent(req.Content)
// 		// 	ru.SetYoutubeID(req.YouTubeID)
// 		// 	ru.SetTargetNumber(req.TargetNumber)
// 		// 	ru.SetRequiredTime(req.RequiredTime)
// 		// 	ru.SetPublish(true)
// 		// 	ru.SetUpdatedAt(time.Now())
// 		// 	ru.SetPublishedAt(time.Now())
// 		// }).
// 		// ID(ctx)

// 	if err != nil {
// 		if !ent.IsConstraintError(err) {
// 			applog.Panic(err)
// 		}
// 	}

// 	if ent.IsConstraintError(err) {
// 		_, err := r.DBConn.Recreation.Update().
// 			Where(
// 				recreation.UserIDEQ(req.UserID),
// 				recreation.RecreationIDEQ(req.RecreationID),
// 			).
// 			SetGenre(req.Genre).
// 			SetTitle(req.Title).
// 			SetContent(req.Content).
// 			SetYoutubeID(req.YouTubeID).
// 			SetTargetNumber(req.TargetNumber).
// 			SetRequiredTime(req.RequiredTime).
// 			SetPublish(true).
// 			SetUpdatedAt(time.Now()).
// 			SetPublishedAt(time.Now()).
// 			Save(ctx)

// 		if err != nil {
// 			applog.Panic(err)
// 		}
// 	}

// 	rec, err := r.DBConn.Recreation.Query().
// 		Where(recreation.RecreationIDEQ(req.RecreationID)).
// 		Only(ctx)

// 	if err != nil {
// 		applog.Panic(err)
// 	}

// 	res := usecase.Response{Data: rec}
// 	return res, err
// }

// func (r *RecreationRepository) DeleteRecreationsByID(ctx context.Context, id int) error {
// 	_, err := r.DBConn.Recreation.Delete().
// 		Where(user.IDEQ(id)).
// 		Exec(ctx)

// 	if err != nil {
// 		applog.Panic(err)
// 	}

// 	return err
// }

func (r *RecreationRepository) GetRecreationsDraft(ctx context.Context, user_id uuid.UUID, limit, offset int) (usecase.Response, error) {
	// count all records first
	count, err := r.DBConn.Recreation.
		Query().
		Where(
			recreation.PublishEQ(false),  // 公開されていないものだけを取得
			recreation.UserIDEQ(user_id), // Draftだけは自分のものだけを取得
		).
		Count(ctx)
	if err != nil {
		applog.Panic(err)
	}

	// then fetch paged records
	recreation, err := r.DBConn.Recreation.
		Query().
		Order(ent.Desc(recreation.FieldCreatedAt)).
		Where(
			recreation.PublishEQ(false),  // 公開されていないものだけを取得
			recreation.UserIDEQ(user_id), // Draftだけは自分のものだけを取得
		).
		Limit(limit).
		Offset(offset).
		All(ctx)
	if err != nil {
		applog.Panic(err)
	}

	stack := make(map[uuid.UUID]*ent.User)
	for _, rec := range recreation {
		if _, ok := stack[rec.UserID]; !ok {
			user, err := r.DBConn.User.Query().
				Where(user.UserIDEQ(rec.UserID)).
				First(ctx)

			if err != nil {
				applog.Panic(err)
			}
			stack[rec.UserID] = user
		}
		rec.Edges.Users = stack[rec.UserID]
	}

	recRes := RecreationResponse{
		Recreations:  recreation,
		TotalRecords: count,
	}

	res := usecase.Response{
		Data: recRes,
	}
	return res, err
}

func (r *RecreationRepository) GetRecreationsDraftByID(ctx context.Context, rec_id, user_id uuid.UUID) (usecase.Response, error) {
	recreation, err := r.DBConn.Recreation.
		Query().
		Where(
			recreation.PublishEQ(false),  // 公開されていないものだけを取得
			recreation.UserIDEQ(user_id), // Draftだけは自分のものだけを取得
			recreation.RecreationIDEQ(rec_id),
		).
		Only(ctx)

	if err != nil {
		if ent.IsNotFound(err) {
			return usecase.Response{}, nil
		}

		applog.Panic(err)
	}

	user, err := r.DBConn.User.Query().
		Where(user.UserIDEQ(recreation.UserID)).
		First(ctx)

	if err != nil {
		applog.Panic(err)
	}

	recreation.Edges.Users = user

	res := usecase.Response{Data: recreation}
	return res, err
}

func (r *RecreationRepository) PutRecreationsDraft(ctx context.Context, req usecase.Request) (usecase.Response, error) {
	_, err := r.DBConn.Recreation.Create().
		SetUserID(req.UserID).
		SetRecreationID(req.RecreationID).
		SetGenre(req.Genre).
		SetTitle(req.Title).
		SetContent(req.Content).
		SetYoutubeID(req.YouTubeID).
		SetTargetNumber(req.TargetNumber).
		SetRequiredTime(req.RequiredTime).
		SetPublish(false).
		SetCreatedAt(time.Now()).
		SetUpdatedAt(time.Now()).
		Save(ctx)
		// OnConflict(
		// 	sql.ConflictColumns(
		// 		recreation.FieldUserID,
		// 		recreation.FieldRecreationID,
		// 	),
		// ).
		// Update(func(r *ent.RecreationUpsert) {
		// 	r.SetGenre(req.Genre)
		// 	r.SetTitle(req.Title)
		// 	r.SetContent(req.Content)
		// 	r.SetYoutubeID(req.YouTubeID)
		// 	r.SetTargetNumber(req.TargetNumber)
		// 	r.SetRequiredTime(req.RequiredTime)
		// 	r.SetPublish(false)
		// 	r.SetUpdatedAt(time.Now())
		// }).
		// ID(ctx)

	if err != nil {
		if !ent.IsConstraintError(err) {
			applog.Panic(err)
		}

		if ent.IsConstraintError(err) {
			_, err := r.DBConn.Recreation.Update().
				Where(
					recreation.UserIDEQ(req.UserID),
					recreation.RecreationIDEQ(req.RecreationID),
				).
				SetGenre(req.Genre).
				SetTitle(req.Title).
				SetContent(req.Content).
				SetYoutubeID(req.YouTubeID).
				SetTargetNumber(req.TargetNumber).
				SetRequiredTime(req.RequiredTime).
				SetPublish(false).
				SetUpdatedAt(time.Now()).
				Save(ctx)

			if err != nil {
				applog.Panic(err)
			}
		}
	}

	rec, err := r.DBConn.Recreation.Query().
		Where(recreation.RecreationIDEQ(req.RecreationID)).
		Only(ctx)

	if err != nil {
		applog.Panic(err)
	}

	res := usecase.Response{Data: rec}
	return res, err
}

func (r *RecreationRepository) PutRecreation(ctx context.Context, req usecase.Request) (usecase.Response, error) {
	_, err := r.DBConn.Recreation.Update().
		Where(
			recreation.UserIDEQ(req.UserID),
			recreation.RecreationIDEQ(req.RecreationID),
		).
		SetGenre(req.Genre).
		SetTitle(req.Title).
		SetContent(req.Content).
		SetYoutubeID(req.YouTubeID).
		SetTargetNumber(req.TargetNumber).
		SetRequiredTime(req.RequiredTime).
		SetPublish(true).
		SetUpdatedAt(time.Now()).
		SetPublishedAt(time.Now()).
		Save(ctx)

	if err != nil {
		applog.Panic(err)
	}

	rec, err := r.DBConn.Recreation.Query().
		Where(recreation.RecreationIDEQ(req.RecreationID)).
		Only(ctx)

	if err != nil {
		applog.Panic(err)
	}

	res := usecase.Response{Data: rec}
	return res, err
}
