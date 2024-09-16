package users

import (
	"app/ent"
	"app/modules/users/interfaces/controller"

	"github.com/go-chi/chi/v5"
)

func Router(r chi.Router, dbconn *ent.Client) chi.Router {
	ctrl := controller.NewUserController(dbconn)

	// ユーザー用のAPI
	r.Route("/user", func(r chi.Router) {
		// r.Use(authrization.AuthMiddleware) // Dockerで開発するときはコメントアウトする

		r.Get("/", ctrl.GetUsers)       // ユーザーを取得するためのAPI
		r.Post("/", ctrl.PostUsers)     // ユーザーを登録するためのAPI
		r.Put("/", ctrl.PutUsers)       // ユーザーを更新するためのAPI
		r.Delete("/", ctrl.DeleteUsers) // ユーザーを削除するためのAPI
	})

	return r
}
