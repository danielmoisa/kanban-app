package router

import (
	"jira-clone/models"

	"github.com/gofiber/fiber"
)

func SetupRoutes(app *fiber.App) {

	// Projects
	app.Get("/api/projects", models.GetProjects)
	app.Get("/api/projects/:id", models.GetProject)
	app.Post("/api/projects", models.NewProject)
	app.Delete("/api/projects/:id", models.DeleteProject)

	// Users
	app.Get("/api/users", models.GetUsers)
	app.Get("/api/users/:id", models.GetUser)
	app.Post("/api/users", models.NewUser)
	app.Delete("/api/users/:id", models.DeleteUser)

	// Issues
	app.Get("/api/issues", models.GetIssues)
	app.Get("/api/issues/:id", models.GetIssue)
	app.Post("/api/issues", models.NewIssue)
	app.Delete("/api/issues/:id", models.DeleteIssue)

	// Comments
	app.Get("/api/comments", models.GetComments)
	app.Get("/api/comments/:id", models.GetComment)
	app.Post("/api/comments", models.NewComment)
	app.Patch("/api/comments/:id", models.UpdateComment)
	app.Delete("/api/comments/:id", models.DeleteComment)
}
