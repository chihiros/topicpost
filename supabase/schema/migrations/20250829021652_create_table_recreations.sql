-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS recreations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    target_age_min INTEGER,
    target_age_max INTEGER,
    participant_count_min INTEGER,
    participant_count_max INTEGER,
    duration_minutes INTEGER,
    required_items TEXT,
    rules TEXT NOT NULL,
    tips TEXT,
    prefecture VARCHAR(2),
    category VARCHAR(20) NOT NULL,
    location_type VARCHAR(10) NOT NULL,
    poster_name VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

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
COMMENT ON COLUMN recreations.prefecture IS '都道府県コード（JIS X 0401準拠）';
COMMENT ON COLUMN recreations.category IS 'カテゴリ（sports/brain/creative/communication）';
COMMENT ON COLUMN recreations.location_type IS '場所タイプ（indoor/outdoor）';
COMMENT ON COLUMN recreations.poster_name IS '投稿者名（匿名可）';
COMMENT ON COLUMN recreations.created_at IS '作成日時';
COMMENT ON COLUMN recreations.updated_at IS '更新日時';

-- インデックス作成
CREATE INDEX idx_recreations_category ON recreations(category);
CREATE INDEX idx_recreations_location_type ON recreations(location_type);
CREATE INDEX idx_recreations_prefecture ON recreations(prefecture);
CREATE INDEX idx_recreations_created_at ON recreations(created_at DESC);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS recreations;
-- +goose StatementEnd