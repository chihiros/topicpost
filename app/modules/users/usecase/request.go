package usecase

import "github.com/google/uuid"

type Request struct {
	UserID   uuid.UUID `json:"user_id"`
	Nickname string    `json:"nickname"`
	IconURL  string    `json:"icon_url"`
}
