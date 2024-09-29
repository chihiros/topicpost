package usecase

import (
	"time"

	"github.com/google/uuid"
)

type UserResponse struct {
	ID        int       `json:"id"`
	UID       uuid.UUID `json:"uid"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
