package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

// User model
type User struct {
	gorm.Model
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string ` json:"password"`
	Projects []Project
}
