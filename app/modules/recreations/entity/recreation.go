package entity

import (
	"time"

	"github.com/google/uuid"
)

// Genreは[]int{}で表現する
type Recreation struct {
	ID           int       `json:"id"`
	UserID       uuid.UUID `json:"user_id"`       // レクリエーションを登録したユーザーのID
	RecreationID uuid.UUID `json:"recreation_id"` // レクリエーションのユニークID
	Genre        []int     `json:"genre"`         // レクリエーションのジャンル
	Title        string    `json:"title"`         // レクリエーションの名前
	Content      string    `json:"content"`       // レクリエーションの説明
	TargetNumber int       `json:"target_number"` // レクリエーションの対象人数
	RequiredTime int       `json:"required_time"` // レクリエーションの所要時間
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}
