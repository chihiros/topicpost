-- +goose Up
-- +goose StatementBegin
-- Drop existing recreations table and recreate with proper schema matching Ent
DROP TABLE IF EXISTS recreations;

-- Create recreations table with proper schema matching Ent entity
CREATE TABLE recreations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT '',
    target_age_min INTEGER,
    target_age_max INTEGER,
    participant_count_min INTEGER,
    participant_count_max INTEGER,
    duration_minutes INTEGER,
    required_items TEXT DEFAULT '',
    rules TEXT NOT NULL,
    tips TEXT DEFAULT '',
    prefecture VARCHAR(10),
    category JSONB DEFAULT '[]'::jsonb,
    location_type VARCHAR(20) NOT NULL,
    image_url VARCHAR(500),
    poster_name VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_recreations_category ON recreations USING GIN(category);
CREATE INDEX idx_recreations_location_type ON recreations(location_type);
CREATE INDEX idx_recreations_prefecture ON recreations(prefecture);
CREATE INDEX idx_recreations_created_at ON recreations(created_at DESC);

-- Add comments
COMMENT ON TABLE recreations IS 'レクリエーション投稿テーブル';
COMMENT ON COLUMN recreations.id IS 'レクリエーションID';
COMMENT ON COLUMN recreations.title IS 'ゲーム名/活動名';
COMMENT ON COLUMN recreations.description IS '概要・説明';
COMMENT ON COLUMN recreations.target_age_min IS '対象年齢最小';
COMMENT ON COLUMN recreations.target_age_max IS '対象年齢最大';
COMMENT ON COLUMN recreations.participant_count_min IS '参加人数最小';
COMMENT ON COLUMN recreations.participant_count_max IS '参加人数最大';
COMMENT ON COLUMN recreations.duration_minutes IS '所要時間（分）';
COMMENT ON COLUMN recreations.required_items IS '必要な道具・準備';
COMMENT ON COLUMN recreations.rules IS 'ルール説明';
COMMENT ON COLUMN recreations.tips IS '注意点・コツ';
COMMENT ON COLUMN recreations.prefecture IS '都道府県';
COMMENT ON COLUMN recreations.category IS 'カテゴリ配列（JSON）';
COMMENT ON COLUMN recreations.location_type IS '場所タイプ（indoor/outdoor）';
COMMENT ON COLUMN recreations.image_url IS '画像・動画URL';
COMMENT ON COLUMN recreations.poster_name IS '投稿者名（匿名可）';
COMMENT ON COLUMN recreations.created_at IS '作成日時';
COMMENT ON COLUMN recreations.updated_at IS '更新日時';
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS recreations;
-- +goose StatementEnd