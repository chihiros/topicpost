package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

type Recreation struct {
	ent.Schema
}

// Fields of the Recreation.
func (Recreation) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("user_id", uuid.UUID{}).
			Immutable().
			Unique(),
		field.UUID("recreation_id", uuid.UUID{}).
			Immutable().
			Unique(),
		field.JSON("genre", []int{}),
		field.String("title"),
		field.String("content"),
		field.String("youtube_id").
			Optional(),
		field.Int("target_number"),
		field.Int("required_time"),
		field.Bool("publish").
			Default(false).
			StructTag(`json:"publish,required"`),
		field.Time("created_at").
			Immutable().
			Default(time.Now),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
		field.Time("published_at").
			Optional(),
	}
}

// Edges of the Recreation.
func (Recreation) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("users", User.Type).
			Ref("recreations").
			Unique(),
	}
}
