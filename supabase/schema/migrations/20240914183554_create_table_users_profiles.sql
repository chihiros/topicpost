-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS users_profiles (
  id SERIAL,
  users_uid UUID NOT NULL PRIMARY KEY,
  profiles_id INT NOT NULL,
  created_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE users_profiles IS 'ユーザーとプロフィールの中間テーブル';
COMMENT ON COLUMN users_profiles.users_uid IS 'ユーザーID';
COMMENT ON COLUMN users_profiles.profiles_id IS 'プロフィールID';
COMMENT ON COLUMN users_profiles.created_at IS '作成日時';
COMMENT ON COLUMN users_profiles.updated_at IS '更新日時';
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE users_profiles;
-- +goose StatementEnd
