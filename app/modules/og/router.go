package og

import (
	"github.com/go-chi/chi/v5"
)

func Router(r chi.Router) chi.Router {
	// OG画像用のAPI
	r.Route("/og", func(r chi.Router) {
		r.Get("/recreation", RecreationOGImage())
	})

	return r
}
