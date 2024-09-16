package usecase

import (
	"github.com/google/uuid"
)

type Request struct {
	UserID       uuid.UUID `json:"user_id"`       // レクリエーションを登録したユーザーのID
	RecreationID uuid.UUID `json:"recreation_id"` // レクリエーションのユニークID
	Genre        []int     `json:"genre"`         // レクリエーションのジャンル
	Title        string    `json:"title"`         // レクリエーションの名前
	Content      string    `json:"content"`       // レクリエーションの説明
	YouTubeID    string    `json:"youtube_id"`    // レクリエーションのYouTubeID
	TargetNumber int       `json:"target_number"` // レクリエーションの対象人数
	RequiredTime int       `json:"required_time"` // レクリエーションの所要時間
}
