package controller

import (
	"app/ent"
	"app/ent/recreation"
	"app/middle/applog"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

type RecreationController struct {
	Client *ent.Client
}

func NewRecreationController(client *ent.Client) *RecreationController {
	return &RecreationController{
		Client: client,
	}
}

type RecreationRequest struct {
	Title                string   `json:"title"`
	Description          *string  `json:"description"`
	TargetAgeMin         *int     `json:"target_age_min"`
	TargetAgeMax         *int     `json:"target_age_max"`
	ParticipantCountMin  *int     `json:"participant_count_min"`
	ParticipantCountMax  *int     `json:"participant_count_max"`
	DurationMinutes      *int     `json:"duration_minutes"`
	RequiredItems        *string  `json:"required_items"`
	Rules                string   `json:"rules"`
	Tips                 *string  `json:"tips"`
	Prefecture           *string  `json:"prefecture"`
	Category             []string `json:"category"`
	LocationType         string   `json:"location_type"`
	ImageUrl             *string  `json:"image_url"`
	PosterName           *string  `json:"poster_name"`
}

type Recreation struct {
	ID                  int      `json:"id"`
	Title               string   `json:"title"`
	Description         *string  `json:"description"`
	TargetAgeMin        *int     `json:"target_age_min"`
	TargetAgeMax        *int     `json:"target_age_max"`
	ParticipantCountMin *int     `json:"participant_count_min"`
	ParticipantCountMax *int     `json:"participant_count_max"`
	DurationMinutes     *int     `json:"duration_minutes"`
	RequiredItems       *string  `json:"required_items"`
	Rules               string   `json:"rules"`
	Tips                *string  `json:"tips"`
	Prefecture          *string  `json:"prefecture"`
	Category            []string `json:"category"`
	LocationType        string   `json:"location_type"`
	ImageUrl            *string  `json:"image_url"`
	PosterName          *string  `json:"poster_name"`
	CreatedAt           string   `json:"created_at"`
	UpdatedAt           string   `json:"updated_at"`
}

// Helper functions to convert between ent types and API types
func stringToPtr(s string) *string {
	if s == "" {
		return nil
	}
	return &s
}

func intToPtr(i int) *int {
	if i == 0 {
		return nil
	}
	return &i
}

func convertEntToAPI(rec *ent.Recreation) Recreation {
	return Recreation{
		ID:                  rec.ID,
		Title:               rec.Title,
		Description:         stringToPtr(rec.Description),
		TargetAgeMin:        intToPtr(rec.TargetAgeMin),
		TargetAgeMax:        intToPtr(rec.TargetAgeMax),
		ParticipantCountMin: intToPtr(rec.ParticipantCountMin),
		ParticipantCountMax: intToPtr(rec.ParticipantCountMax),
		DurationMinutes:     intToPtr(rec.DurationMinutes),
		RequiredItems:       stringToPtr(rec.RequiredItems),
		Rules:               rec.Rules,
		Tips:                stringToPtr(rec.Tips),
		Prefecture:          stringToPtr(rec.Prefecture),
		Category:            rec.Category,
		LocationType:        string(rec.LocationType),
		ImageUrl:            stringToPtr(rec.ImageURL),
		PosterName:          stringToPtr(rec.PosterName),
		CreatedAt:           rec.CreatedAt.Format("2006-01-02T15:04:05Z07:00"),
		UpdatedAt:           rec.UpdatedAt.Format("2006-01-02T15:04:05Z07:00"),
	}
}

type RecreationResponse struct {
	Data    Recreation `json:"data"`
	Message string     `json:"message"`
}

type RecreationListResponse struct {
	Data    []Recreation `json:"data"`
	Total   int          `json:"total"`
	Page    int          `json:"page"`
	PerPage int          `json:"per_page"`
	Message string       `json:"message"`
}

type ErrorResponse struct {
	Message string `json:"message"`
}

func (rc *RecreationController) CreateRecreation(w http.ResponseWriter, r *http.Request) {
	var req RecreationRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		applog.Warn(err.Error())
		errorResponse := ErrorResponse{Message: "Invalid request body"}
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, errorResponse)
		return
	}

	// Create recreation
	recreation, err := rc.Client.Recreation.Create().
		SetTitle(req.Title).
		SetNillableDescription(req.Description).
		SetNillableTargetAgeMin(req.TargetAgeMin).
		SetNillableTargetAgeMax(req.TargetAgeMax).
		SetNillableParticipantCountMin(req.ParticipantCountMin).
		SetNillableParticipantCountMax(req.ParticipantCountMax).
		SetNillableDurationMinutes(req.DurationMinutes).
		SetNillableRequiredItems(req.RequiredItems).
		SetRules(req.Rules).
		SetNillableTips(req.Tips).
		SetNillablePrefecture(req.Prefecture).
		SetCategory(req.Category).
		SetLocationType(recreation.LocationType(req.LocationType)).
		SetNillableImageURL(req.ImageUrl).
		SetNillablePosterName(req.PosterName).
		Save(r.Context())

	if err != nil {
		applog.Warn(err.Error())
		errorResponse := ErrorResponse{Message: err.Error()}
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, errorResponse)
		return
	}

	response := RecreationResponse{
		Data:    convertEntToAPI(recreation),
		Message: "レクリエーションを作成しました",
	}

	render.Status(r, http.StatusCreated)
	render.JSON(w, r, response)
}

func (rc *RecreationController) GetRecreations(w http.ResponseWriter, r *http.Request) {
	// Parse query parameters
	page := 1
	perPage := 20
	
	if p := r.URL.Query().Get("page"); p != "" {
		if parsed, err := strconv.Atoi(p); err == nil && parsed > 0 {
			page = parsed
		}
	}
	
	if pp := r.URL.Query().Get("per_page"); pp != "" {
		if parsed, err := strconv.Atoi(pp); err == nil && parsed > 0 && parsed <= 100 {
			perPage = parsed
		}
	}

	query := rc.Client.Recreation.Query()

	// Apply filters
	// Note: JSON field filtering is simplified for now
	// In production, you would implement proper JSON querying

	if locationType := r.URL.Query().Get("location_type"); locationType != "" {
		query = query.Where(recreation.LocationTypeEQ(recreation.LocationType(locationType)))
	}

	if prefecture := r.URL.Query().Get("prefecture"); prefecture != "" {
		query = query.Where(recreation.PrefectureEQ(prefecture))
	}

	if q := r.URL.Query().Get("q"); q != "" {
		query = query.Where(recreation.Or(
			recreation.TitleContains(q),
			recreation.DescriptionContains(q),
			recreation.RulesContains(q),
		))
	}

	// Get total count
	total, err := query.Clone().Count(r.Context())
	if err != nil {
		applog.Warn(err.Error())
		errorResponse := ErrorResponse{Message: err.Error()}
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, errorResponse)
		return
	}

	// Apply pagination and sorting
	offset := (page - 1) * perPage
	sort := r.URL.Query().Get("sort")
	
	switch sort {
	case "created_at_asc":
		query = query.Order(ent.Asc(recreation.FieldCreatedAt))
	case "title_asc":
		query = query.Order(ent.Asc(recreation.FieldTitle))
	case "title_desc":
		query = query.Order(ent.Desc(recreation.FieldTitle))
	default: // created_at_desc
		query = query.Order(ent.Desc(recreation.FieldCreatedAt))
	}

	recreations, err := query.
		Offset(offset).
		Limit(perPage).
		All(r.Context())

	if err != nil {
		applog.Warn(err.Error())
		errorResponse := ErrorResponse{Message: err.Error()}
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, errorResponse)
		return
	}

	// Convert to response format
	data := make([]Recreation, len(recreations))
	for i, rec := range recreations {
		data[i] = convertEntToAPI(rec)
	}

	response := RecreationListResponse{
		Data:    data,
		Total:   total,
		Page:    page,
		PerPage: perPage,
		Message: "レクリエーション一覧を取得しました",
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, response)
}

func (rc *RecreationController) GetRecreation(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		errorResponse := ErrorResponse{Message: "Invalid ID"}
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, errorResponse)
		return
	}

	recreation, err := rc.Client.Recreation.Get(r.Context(), id)
	if err != nil {
		if ent.IsNotFound(err) {
			errorResponse := ErrorResponse{Message: "レクリエーションが見つかりません"}
			render.Status(r, http.StatusNotFound)
			render.JSON(w, r, errorResponse)
			return
		}
		applog.Warn(err.Error())
		errorResponse := ErrorResponse{Message: err.Error()}
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, errorResponse)
		return
	}

	response := RecreationResponse{
		Data:    convertEntToAPI(recreation),
		Message: "レクリエーション情報を取得しました",
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, response)
}