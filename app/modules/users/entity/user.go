package entity

import "time"

type User struct {
	ID        int       `json:"id"`
	UserID    string    `json:"user_id"`
	Nickname  string    `json:"nickname"`
	IconURL   string    `json:"icon_url"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
