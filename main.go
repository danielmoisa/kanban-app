package main

import (
	"fmt"
	"jira-clone/database"
	"jira-clone/models"

	"github.com/gofiber/cors"
	"github.com/gofiber/fiber"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func setupRoutes(app *fiber.App) {
	// Issues
	app.Get("/api/issues", models.GetIssues)
	app.Get("/api/issues/:id", models.GetIssue)
	app.Post("/api/issues", models.NewIssue)
	app.Delete("/api/issues/:id", models.DeleteIssue)

	// Users
	app.Get("/api/users", models.GetUsers)
	app.Get("/api/users/:id", models.GetUser)
	app.Post("/api/users", models.NewUser)
	app.Delete("/api/users/:id", models.DeleteUser)
}

func initDatabase() {
	var err error
	database.DBConn, err = gorm.Open("sqlite3", "database.db")
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("Connection Opened to Database")
	database.DBConn.AutoMigrate(&models.Issue{}, &models.User{})
	fmt.Println("Database Migrated")
}

func main() {
	app := fiber.New()
	app.Use(cors.New())
	initDatabase()

	setupRoutes(app)
	app.Listen("127.0.0.1:8080")

	defer database.DBConn.Close()
}
