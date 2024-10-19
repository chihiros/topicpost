package infra

import (
	"app/ent"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

func NewPostgresConnection() (*ent.Client, error) {
	url := createPostgresUrl(
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)

	client, err := ent.Open("postgres", url)
	if err != nil {
		log.Printf("failed opening connection to postgres: %v", err)
		return nil, err
	}

	// Debug logging
	// client = client.Debug()

	return client, nil
}

func NewPostgresConnectionX() *ent.Client {
	conn, err := NewPostgresConnection()
	if err != nil {
		log.Fatal(err)
	}

	return conn
}

func createPostgresUrl(db_user, db_password, db_host, db_port, db_name string) string {
	url := fmt.Sprintf("postgres://%s:%s@%s:%s/%s",
		db_user,
		db_password,
		db_host,
		db_port,
		db_name,
	)

	if db_host == "supabase_db_supabase-local" {
		url += "?sslmode=disable"
	}

	return url
}
