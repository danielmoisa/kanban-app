package controllers

import (
	"jira-clone/database"
	"jira-clone/models"

	"github.com/gofiber/fiber/v2"
)

// GetProjects handler
func GetProjects(c *fiber.Ctx) error {
	db := database.DBConn
	var projects []models.Project
	db.Preload("Issues.Comments").Find(&projects)
	return c.JSON(projects)
}

//GetProject handler
func GetProject(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DBConn
	var project models.Project
	db.Preload("Issues.Comments").Find(&project, id)
	return c.JSON(project)
}

// NewProject create handler
func NewProject(c *fiber.Ctx) error {
	db := database.DBConn
	project := new(models.Project)
	if err := c.BodyParser(project); err != nil {
		c.SendStatus(503)
	}
	db.Create(&project)
	return c.JSON(project)
}

func UpdateProject(c *fiber.Ctx) error {
	type DataUpdateProject struct {
		Name        string `json:"name"`
		Description string `json:"description"`
		Category    string `json:"category"`
	}
	var dataUB DataUpdateProject
	if err := c.BodyParser(&dataUB); err != nil {
		c.SendStatus(503)
	}
	var project models.Project
	id := c.Params("id")
	db := database.DBConn
	db.First(&project, id)
	if project.Name == "" {
		c.SendString("No project Found with ID")
	}

	db.Model(&project).Updates(models.Project{Name: dataUB.Name, Description: dataUB.Description, Category: dataUB.Category})
	return c.JSON(project)
}

//DeleteProject handler
func DeleteProject(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DBConn

	var project models.Project
	db.First(&project, id)
	if project.Name == "" {
		c.SendString("No project Found with ID")

	}
	db.Delete(&project)
	return c.SendString("Project Successfully deleted")
}
