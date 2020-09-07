package main

import (
	"fmt"
	"jira-clone/database"
	"jira-clone/models"
	"os"

	"github.com/gofiber/cors"
	"github.com/gofiber/fiber"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	_ "github.com/joho/godotenv/autoload"
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

	// Comments
	app.Get("/api/comments", models.GetComments)
	app.Get("/api/comments/:id", models.GetComment)
	app.Post("/api/comments", models.NewComment)
	app.Delete("/api/comments/:id", models.DeleteComment)
}

func initDatabase() {
	var err error
	database.DBConn, err = gorm.Open("sqlite3", "database.db")
	if err != nil {
		panic("Failed to connect database")
	}
	fmt.Println("Connection Opened to Database")
	database.DBConn.AutoMigrate(&models.Issue{}, &models.User{}, &models.Comment{})
	fmt.Println("Database Migrated")
}

func main() {
	app := fiber.New()
	app.Use(cors.New())
	initDatabase()

	setupRoutes(app)
	app.Listen("127.0.0.1:" + os.Getenv("PORT"))

	defer database.DBConn.Close()
}
