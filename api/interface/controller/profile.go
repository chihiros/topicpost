package controller

import (
	"app/ent"
	"app/ent/profile"
	"app/middle/applog"
	"encoding/json"
	"net/http"

	"github.com/go-chi/render"
)

type ProfileController struct {
	Client *ent.Client
}

func NewProfileController(client *ent.Client) *ProfileController {
	return &ProfileController{
		Client: client,
	}
}

type ProfileRequest struct {
	UserID        string   `json:"user_id"`
	DisplayName   string   `json:"display_name"`
	Email         *string  `json:"email"`
	Prefecture    *string  `json:"prefecture"`
	City          *string  `json:"city"`
	Organization  *string  `json:"organization"`
	Role          *string  `json:"role"`
	ActivityYears *int     `json:"activity_years"`
	Bio           *string  `json:"bio"`
	AvatarURL     *string  `json:"avatar_url"`
	Interests     []string `json:"interests"`
}

type Profile struct {
	ID            int      `json:"id"`
	UserID        string   `json:"user_id"`
	DisplayName   string   `json:"display_name"`
	Email         *string  `json:"email"`
	Prefecture    *string  `json:"prefecture"`
	City          *string  `json:"city"`
	Organization  *string  `json:"organization"`
	Role          *string  `json:"role"`
	ActivityYears *int     `json:"activity_years"`
	Bio           *string  `json:"bio"`
	AvatarURL     *string  `json:"avatar_url"`
	Interests     []string `json:"interests"`
	CreatedAt     string   `json:"created_at"`
	UpdatedAt     string   `json:"updated_at"`
}

func convertProfileEntToAPI(prof *ent.Profile) Profile {
	return Profile{
		ID:            prof.ID,
		UserID:        prof.UserID,
		DisplayName:   prof.DisplayName,
		Email:         stringToPtr(prof.Email),
		Prefecture:    stringToPtr(prof.Prefecture),
		City:          stringToPtr(prof.City),
		Organization:  stringToPtr(prof.Organization),
		Role:          stringToPtr(prof.Role),
		ActivityYears: intToPtr(prof.ActivityYears),
		Bio:           stringToPtr(prof.Bio),
		AvatarURL:     stringToPtr(prof.AvatarURL),
		Interests:     prof.Interests,
		CreatedAt:     prof.CreatedAt.Format("2006-01-02T15:04:05Z07:00"),
		UpdatedAt:     prof.UpdatedAt.Format("2006-01-02T15:04:05Z07:00"),
	}
}

type ProfileResponse struct {
	Profile Profile `json:"profile"`
	Message string  `json:"message"`
}

func (pc *ProfileController) GetProfile(w http.ResponseWriter, r *http.Request) {
	userID := r.URL.Query().Get("userId")
	if userID == "" {
		errorResponse := ErrorResponse{Message: "User ID is required"}
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, errorResponse)
		return
	}

	// Check if profile exists
	prof, err := pc.Client.Profile.Query().
		Where(profile.UserID(userID)).
		First(r.Context())

	if err != nil {
		if ent.IsNotFound(err) {
			// Profile doesn't exist, create one from user info or return empty profile
			// For now, return a default profile structure
			defaultProfile := Profile{
				UserID:        userID,
				DisplayName:   "ユーザー",
				Email:         nil,
				Prefecture:    nil,
				City:          nil,
				Organization:  nil,
				Role:          nil,
				ActivityYears: nil,
				Bio:           nil,
				AvatarURL:     nil,
				Interests:     []string{},
				CreatedAt:     "",
				UpdatedAt:     "",
			}

			response := ProfileResponse{
				Profile: defaultProfile,
				Message: "デフォルトプロフィール情報を返しました",
			}

			render.Status(r, http.StatusOK)
			render.JSON(w, r, response)
			return
		}
		applog.Warn(err.Error())
		errorResponse := ErrorResponse{Message: err.Error()}
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, errorResponse)
		return
	}

	response := ProfileResponse{
		Profile: convertProfileEntToAPI(prof),
		Message: "プロフィール情報を取得しました",
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, response)
}

func (pc *ProfileController) CreateOrUpdateProfile(w http.ResponseWriter, r *http.Request) {
	var req ProfileRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		applog.Warn(err.Error())
		errorResponse := ErrorResponse{Message: "Invalid request body"}
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, errorResponse)
		return
	}

	// Check if profile already exists
	existingProfile, err := pc.Client.Profile.Query().
		Where(profile.UserID(req.UserID)).
		First(r.Context())

	var prof *ent.Profile
	
	if err != nil && ent.IsNotFound(err) {
		// Create new profile
		prof, err = pc.Client.Profile.Create().
			SetUserID(req.UserID).
			SetDisplayName(req.DisplayName).
			SetNillableEmail(req.Email).
			SetNillablePrefecture(req.Prefecture).
			SetNillableCity(req.City).
			SetNillableOrganization(req.Organization).
			SetNillableRole(req.Role).
			SetNillableActivityYears(req.ActivityYears).
			SetNillableBio(req.Bio).
			SetNillableAvatarURL(req.AvatarURL).
			SetInterests(req.Interests).
			Save(r.Context())
	} else if err == nil {
		// Update existing profile
		prof, err = existingProfile.Update().
			SetDisplayName(req.DisplayName).
			SetNillableEmail(req.Email).
			SetNillablePrefecture(req.Prefecture).
			SetNillableCity(req.City).
			SetNillableOrganization(req.Organization).
			SetNillableRole(req.Role).
			SetNillableActivityYears(req.ActivityYears).
			SetNillableBio(req.Bio).
			SetNillableAvatarURL(req.AvatarURL).
			SetInterests(req.Interests).
			Save(r.Context())
	} else {
		applog.Warn(err.Error())
		errorResponse := ErrorResponse{Message: err.Error()}
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, errorResponse)
		return
	}

	if err != nil {
		applog.Warn(err.Error())
		errorResponse := ErrorResponse{Message: err.Error()}
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, errorResponse)
		return
	}

	response := ProfileResponse{
		Profile: convertProfileEntToAPI(prof),
		Message: "プロフィールを保存しました",
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, response)
}