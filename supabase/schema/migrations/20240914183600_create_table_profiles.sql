-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS profiles (
	id SERIAL,
    name TEXT NOT NULL,
    icon_url TEXT NULL DEFAULT NULL,
	prefecture VARCHAR(2) NULL,
	created_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE profiles IS 'プロフィールテーブル';
COMMENT ON COLUMN profiles.id IS 'プロフィールID';
COMMENT ON COLUMN profiles.name IS '名前';
COMMENT ON COLUMN profiles.icon_url IS 'アイコンURL';
COMMENT ON COLUMN profiles.prefecture IS '都道府県番号:JIS X 0401に準拠';
COMMENT ON COLUMN profiles.created_at IS '作成日時';
COMMENT ON COLUMN profiles.updated_at IS '更新日時';
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE profiles;
-- +goose StatementEnd
