package infra

import (
	"app/ent"
	"context"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

func NewSQLite3Connection() (*ent.Client, error) {
	client, err := ent.Open("sqlite3", "file:ent?mode=memory&cache=shared&_fk=1")
	if err != nil {
		log.Printf("failed opening connection to sqlite: %v", err)
	}

	// Dockerで使う場合は、下記のコメントアウトを外してください。
	ctx := context.Background()
	if err := client.Schema.Create(ctx); err != nil {
		log.Printf("failed creating schema resources: %v", err)
	}

	return client, err
}
