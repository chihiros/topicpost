package main

import (
	"app/di"
	"app/infra"
	"app/middle/applog"
	"net/http"
	"time"
)

func main() {
	applog.Setenv(applog.DEV)
	// applog.Setenv(applog.PROD)

	// ロケールを日本に設定する
	{
		jst, err := time.LoadLocation("Asia/Tokyo")
		if err != nil {
			applog.Panic(err)
		}
		time.Local = jst
	}

	userController := di.InitializeUserController()
	recreationController := di.InitializeRecreationController()
	r := infra.NewRouter(
		userController,
		recreationController,
	)
	if err := http.ListenAndServe(":8080", r); err != nil {
		applog.Panic(err)
	}
}
