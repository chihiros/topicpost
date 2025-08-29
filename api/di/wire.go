//go:build wireinject
// +build wireinject

package di

import (
	"app/infra"
	"app/interface/controller"
	"app/interface/repository"
	"app/usecase"

	"github.com/google/wire"
)

// プロバイダーセット
func InitializeUserController() *controller.UserController {
	wire.Build(
		repository.NewUserRepository, // リポジトリ
		infra.NewPostgresConnectionX, // DB接続
		wire.Bind(new(usecase.UserRepository), new(*repository.UserRepository)), // インターフェースと実装のバインド
		usecase.NewUserUsecase,       // ユースケース
		controller.NewUserController, // コントローラー
	)
	return nil
}

func InitializeRecreationController() *controller.RecreationController {
	wire.Build(
		infra.NewPostgresConnectionX, // DB接続
		controller.NewRecreationController, // コントローラー
	)
	return nil
}
