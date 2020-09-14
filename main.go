package main

import (
	"fmt"
	"jira-clone/database"
	"jira-clone/models"
	"jira-clone/router"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	_ "github.com/joho/godotenv/autoload"
)

func initDatabase() {
	var err error
	database.DBConn, err = gorm.Open("sqlite3", "database.db")
	if err != nil {
		panic("Failed to connect database")
	}
	fmt.Println("Connection Opened to Database")
	database.DBConn.AutoMigrate(&models.Project{}, &models.Issue{}, &models.User{}, &models.Comment{})
	fmt.Println("Database Migrated")
}

func main() {
	app := fiber.New()
	app.Use(cors.New())

	initDatabase()
	router.SetupRoutes(app)

	app.Listen("127.0.0.1:" + os.Getenv("PORT"))

	defer database.DBConn.Close()
}
