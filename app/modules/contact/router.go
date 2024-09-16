package contact

import (
	"app/modules/contact/interfaces/controller"

	"github.com/go-chi/chi/v5"
)

func Router(r chi.Router) chi.Router {
	ctrl := controller.NewContactController()

	r.Route("/contact", func(r chi.Router) {
		r.Post("/", ctrl.PostContact)
	})

	return r
}
