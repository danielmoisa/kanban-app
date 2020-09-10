package models

import (
	"jira-clone/database"

	"github.com/gofiber/fiber"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

// Project model
type Project struct {
	gorm.Model
	Name        string `json:"name"`
	Description string `json:"description"`
	Category    string `json:"category"`
	UserID      uint
	Issues      []Issue
}

// GetProjects handler
func GetProjects(c *fiber.Ctx) {
	db := database.DBConn
	var projects []Project
	db.Preload("Issues.Comments").Find(&projects)
	c.JSON(projects)
}

//GetProject handler
func GetProject(c *fiber.Ctx) {
	id := c.Params("id")
	db := database.DBConn
	var project Project
	db.Preload("Issues.Comments").Find(&project, id)
	c.JSON(project)
}

// NewProject create handler
func NewProject(c *fiber.Ctx) {
	db := database.DBConn
	project := new(Project)
	if err := c.BodyParser(project); err != nil {
		c.Status(503).Send(err)
		return
	}
	db.Create(&project)
	c.JSON(project)
}

//DeleteProject handler
func DeleteProject(c *fiber.Ctx) {
	id := c.Params("id")
	db := database.DBConn

	var project Project
	db.First(&project, id)
	if project.Name == "" {
		c.Status(500).Send("No project Found with ID")
		return
	}
	db.Delete(&project)
	c.Send("Project Successfully deleted")
}

// TODO: implement preloader on all cases if needed?
