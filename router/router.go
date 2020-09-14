package router

import (
	"jira-clone/models"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {

	// Users
	app.Get("/api/users", models.GetUsers)
	app.Get("/api/users/:id", models.GetUser)
	app.Post("/api/users", models.NewUser)
	app.Patch("/api/users/:id", models.UpdateUser)
	app.Delete("/api/users/:id", models.DeleteUser)

	// Projects
	app.Get("/api/projects", models.GetProjects)
	app.Get("/api/projects/:id", models.GetProject)
	app.Post("/api/projects", models.NewProject)
	app.Patch("/api/projects/:id", models.UpdateProject)
	app.Delete("/api/projects/:id", models.DeleteProject)

	// Issues
	app.Get("/api/issues", models.GetIssues)
	app.Get("/api/issues/:id", models.GetIssue)
	app.Post("/api/issues", models.NewIssue)
	app.Patch("/api/issues/:id", models.UpdateIssue)
	app.Delete("/api/issues/:id", models.DeleteIssue)

	// Comments
	app.Get("/api/comments", models.GetComments)
	app.Get("/api/comments/:id", models.GetComment)
	app.Post("/api/comments", models.NewComment)
	app.Patch("/api/comments/:id", models.UpdateComment)
	app.Delete("/api/comments/:id", models.DeleteComment)
}
