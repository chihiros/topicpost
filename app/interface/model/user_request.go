package model

import "github.com/google/uuid"

type UserRequest struct {
	UID uuid.UUID `json:"uid"`
}
