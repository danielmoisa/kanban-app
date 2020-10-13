package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

// Issue ..
type Issue struct {
	gorm.Model
	Title       string `json:"title"`
	Description string `json:"description"`
	Reporter    string `json:"reporter"`
	Timelog     int    `json:"timelog"`
	Estimated   int    `json:"estimated"`
	Progress    string `json:"progress"`
	Priority    string `json:"priority"`
	Imgid       string `json:"imgid"`
	ProjectID   uint
	Comments    []Comment
}
