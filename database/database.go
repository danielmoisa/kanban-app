package database

import (
	"fmt"
	"jira-clone/models"

	"github.com/jinzhu/gorm"
)

var (
	DBConn *gorm.DB
)

func InitDatabase() {
	var err error
	DBConn, err = gorm.Open("sqlite3", "database.db")
	if err != nil {
		panic("Failed to connect database")
	}
	fmt.Println("Connection Opened to Database")
	DBConn.AutoMigrate(&models.Project{}, &models.Issue{}, &models.User{}, &models.Comment{})
	fmt.Println("Database Migrated")
}
