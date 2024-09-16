package recreations

import (
	"app/ent"
	"app/middle/authrization"
	"app/modules/recreations/interfaces/controller"

	"github.com/go-chi/chi/v5"
)

func Router(r chi.Router, dbconn *ent.Client) chi.Router {
	ctrl := controller.NewRecreationController(dbconn)

	// レクリエーション用のAPI
	r.Route("/recreation", func(r chi.Router) {
		// JWTが不要なやつ
		// 公開されているレクリエーションの一覧を取得するためのAPI
		r.Get("/", ctrl.GetRecreations)

		// JWTが必要なやつ
		r.With(authrization.AuthMiddleware).Group(func(r chi.Router) {
			// // レクリエーションを投稿するためのAPI
			// r.Post("/", rcon.PostRecreations) // PublishするためのAPIにする

			// 下書きのレクリエーションを取得するためのAPI
			r.Get("/draft", ctrl.GetRecreationsDraftByID)
			// レクリエーションの途中保存で使うAPI
			r.Put("/draft", ctrl.PutRecreationsDraft)

			r.Put("/", ctrl.PutRecreation)
			// レクリエーションを公開するためのAPI
			// r.Patch("/publish", rcon.PatchRecreationsPublish)
		})
	})

	return r
}
