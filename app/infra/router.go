package infra

import (
	"app/middle/authrization"
	"app/modules/contact"
	"app/modules/og"
	"app/modules/recreations"
	"app/modules/users"
	"encoding/json"
	"net/http"
	"time"

	"github.com/chihiros/logger"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

func NewRouter() *chi.Mux {
	r := chi.NewRouter()
	r.Use(logger.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cacheControlMiddleware)

	// Access-Control-Allow-Originを許可する
	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins: []string{"https://*", "http://*"},
		// AllowedOrigins: []string{"http://localhost:3000", "https://stg.topicpost.net"}, // 特定のオリジンのみ許可
		AllowedOrigins: []string{"*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "Access-Control-Allow-Origin"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	r.Route("/v1", func(r chi.Router) {
		users.Router(r, NewPostgresConnectionX())
		recreations.Router(r, NewPostgresConnectionX())
		contact.Router(r)
		og.Router(r)

		// 疎通確認用のAPI
		r.Route("/now", func(r chi.Router) {
			r.Get("/", func(w http.ResponseWriter, r *http.Request) {
				jst, err := time.LoadLocation("Asia/Tokyo")
				if err != nil {
					panic(err)
				}
				now := time.Now().In(jst)
				w.WriteHeader(http.StatusOK)
				json.NewEncoder(w).Encode(now)
			})
		})

		// Example
		r.Route("/example", func(r chi.Router) {
			r.Get("/nojwt", func(w http.ResponseWriter, r *http.Request) {
				w.WriteHeader(http.StatusOK)
				json.NewEncoder(w).Encode("This is NOT JWT protected API.")
			})

			r.With(authrization.AuthMiddleware).Group(func(r chi.Router) {
				r.Get("/jwt", func(w http.ResponseWriter, r *http.Request) {
					w.WriteHeader(http.StatusOK)
					json.NewEncoder(w).Encode("This is JWT protected API.")
				})
			})
		})
	})

	return r
}

func cacheControlMiddleware(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		header := map[string]string{
			"Cache-Control":             "no-cache, no-store",
			"Pragma":                    "no-cache",
			"Expires":                   "-1",
			"X-Content-Type-Options":    "nosniff",
			"X-XSS-Protection":          "1; mode=block",
			"Strict-Transport-Security": "max-age=15552000",
			"X-Frame-Options":           "SAMEORIGIN",
		}

		for k, v := range header {
			w.Header().Set(k, v)
		}

		next.ServeHTTP(w, r)
	}

	return http.HandlerFunc(fn)
}
