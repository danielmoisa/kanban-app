package router

import (
	"jira-clone/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {

	// Users
	app.Get("/", controllers.GetUsers)
	app.Get("/:id", controllers.GetUser)
	app.Post("/", controllers.NewUser)
	app.Patch("/:id", controllers.UpdateUser)
	app.Delete("/:id", controllers.DeleteUser)

	// Projects
	app.Get("/api/projects", controllers.GetProjects)
	app.Get("/api/projects/:id", controllers.GetProject)
	app.Post("/api/projects", controllers.NewProject)
	app.Patch("/api/projects/:id", controllers.UpdateProject)
	app.Delete("/api/projects/:id", controllers.DeleteProject)

	// Issues
	app.Get("/api/issues", controllers.GetIssues)
	app.Get("/api/issues/:id", controllers.GetIssue)
	app.Post("/api/issues", controllers.NewIssue)
	app.Patch("/api/issues/:id", controllers.UpdateIssue)
	app.Delete("/api/issues/:id", controllers.DeleteIssue)

	// Comments
	app.Get("/api/comments", controllers.GetComments)
	app.Get("/api/comments/:id", controllers.GetComment)
	app.Post("/api/comments", controllers.NewComment)
	app.Patch("/api/comments/:id", controllers.UpdateComment)
	app.Delete("/api/comments/:id", controllers.DeleteComment)
}
