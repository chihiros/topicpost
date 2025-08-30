package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// Profile holds the schema definition for the Profile entity.
type Profile struct {
	ent.Schema
}

// Fields of the Profile.
func (Profile) Fields() []ent.Field {
	return []ent.Field{
		field.String("user_id").
			NotEmpty().
			Unique(),
		field.String("display_name").
			NotEmpty(),
		field.String("email").
			Optional(),
		field.String("prefecture").
			Optional(),
		field.String("city").
			Optional(),
		field.String("organization").
			Optional(),
		field.String("role").
			Optional(),
		field.Int("activity_years").
			Optional(),
		field.String("bio").
			Optional(),
		field.String("avatar_url").
			Optional(),
		field.JSON("interests", []string{}).
			Default([]string{}),
		field.Time("created_at").
			Default(time.Now()),
		field.Time("updated_at").
			Default(time.Now()),
	}
}

// Edges of the Profile.
func (Profile) Edges() []ent.Edge {
	return nil
}
