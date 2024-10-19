package entity

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID        int
	UID       uuid.UUID
	CreatedAt time.Time
	UpdatedAt time.Time
}
