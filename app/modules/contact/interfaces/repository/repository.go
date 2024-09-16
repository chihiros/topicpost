package repository

import (
	"app/middle/webhook"
	"app/modules/contact/usecase"
	"context"
	"os"
)

type ContactRepository struct{}

func NewContactRepository() *ContactRepository {
	return &ContactRepository{}
}

func (c *ContactRepository) PostContact(ctx context.Context, req usecase.Request) (usecase.Response, error) {
	webhook_url := os.Getenv("WEBHOOK_URL")
	text := "お問い合わせがありました\n\n" +
		"名前: " + req.Name + "\n" +
		"メールアドレス: " + req.Email + "\n" +
		"内容: ```" + req.Content + "```"

	webhook.PostWebhook(
		webhook_url,
		text,
	)

	res := usecase.Response{Data: "success"}
	return res, nil
}
