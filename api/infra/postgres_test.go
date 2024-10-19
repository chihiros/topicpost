package infra

import (
	"testing"
)

func Test_createPostgresUrl(t *testing.T) {
	type args struct {
		db_user     string
		db_password string
		db_host     string
		db_port     string
		db_name     string
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		{
			name: "Test createPostgresUrl",
			args: args{
				db_user:     "db_user",
				db_password: "db_password",
				db_host:     "db_host",
				db_port:     "db_port",
				db_name:     "db_name",
			},
			want: "postgres://db_user:db_password@db_host:db_port/db_name",
		},
		{
			name: "Test createPostgresUrl with supabase_db_supabase-local",
			args: args{
				db_user:     "db_user",
				db_password: "db_password",
				db_host:     "supabase_db_supabase-local",
				db_port:     "db_port",
				db_name:     "db_name",
			},
			want: "postgres://db_user:db_password@supabase_db_supabase-local:db_port/db_name?sslmode=disable",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := createPostgresUrl(tt.args.db_user, tt.args.db_password, tt.args.db_host, tt.args.db_port, tt.args.db_name); got != tt.want {
				t.Errorf("createPostgresUrl() = %v, want %v", got, tt.want)
			}
		})
	}
}
