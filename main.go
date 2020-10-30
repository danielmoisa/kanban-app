package main

import (
	"kanban-app/config"
	"kanban-app/database"
	"kanban-app/router"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	app := fiber.New()
	app.Use(cors.New(), logger.New())

	database.InitDatabase()
	router.SetupRoutes(app)

	app.Listen(":" + config.Config("PORT"))

	defer database.DBConn.Close()
}
