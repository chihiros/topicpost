package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// Recreation holds the schema definition for the Recreation entity.
type Recreation struct {
	ent.Schema
}

// Fields of the Recreation.
func (Recreation) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").Positive().Unique(),
		field.String("title").MaxLen(100).NotEmpty(),
		field.Text("description").Optional(),
		field.Int("target_age_min").Optional().Positive(),
		field.Int("target_age_max").Optional().Positive(),
		field.Int("participant_count_min").Optional().Positive(),
		field.Int("participant_count_max").Optional().Positive(),
		field.Int("duration_minutes").Optional().Positive(),
		field.Text("required_items").Optional(),
		field.Text("rules").NotEmpty(),
		field.Text("tips").Optional(),
		field.String("prefecture").MaxLen(2).Optional(),
		field.JSON("category", []string{}),
		field.String("image_url").Optional(),
		field.Enum("location_type").
			Values("indoor", "outdoor"),
		field.String("poster_name").MaxLen(50).Optional(),
		field.Time("created_at").Default(time.Now).Immutable(),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}

// Edges of the Recreation.
func (Recreation) Edges() []ent.Edge {
	return nil
}

// Indexes of the Recreation.
func (Recreation) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("category"),
		index.Fields("location_type"),
		index.Fields("prefecture"),
		index.Fields("created_at").StorageKey("idx_recreations_created_at"),
	}
}