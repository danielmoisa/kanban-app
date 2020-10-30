package controllers

import (
	"kanban-app/database"
	"kanban-app/models"

	"github.com/gofiber/fiber/v2"
)

func GetIssues(c *fiber.Ctx) error {
	db := database.DBConn
	var issues []models.Issue
	db.Preload("Comments").Find(&issues)
	return c.JSON(issues)
}

func GetIssue(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DBConn
	var issue models.Issue
	db.Preload("Comments").Find(&issue, id)
	return c.JSON(issue)
}

func NewIssue(c *fiber.Ctx) error {
	db := database.DBConn
	issue := new(models.Issue)
	if err := c.BodyParser(issue); err != nil {
		c.SendStatus(503)
	}
	db.Create(&issue)
	return c.JSON(issue)
}

func UpdateIssue(c *fiber.Ctx) error {
	type DataUpdateIssue struct {
		Title       string `json:"title"`
		Description string `json:"description"`
		Reporter    string `json:"reporter"`
		Timelog     int    `json:"timelog"`
		Estimated   int    `json:"estimated"`
		Progress    string `json:"progress"`
		Priority    string `json:"priority"`
	}
	var dataUB DataUpdateIssue
	if err := c.BodyParser(&dataUB); err != nil {
		c.SendStatus(503)

	}
	var issue models.Issue
	id := c.Params("id")
	db := database.DBConn
	db.First(&issue, id)
	if issue.Title == "" {
		c.SendString("No issue Found with ID")

	}

	db.Model(&issue).Updates(models.Issue{Title: dataUB.Title, Description: dataUB.Description, Reporter: dataUB.Reporter, Timelog: dataUB.Timelog, Estimated: dataUB.Estimated, Progress: dataUB.Progress, Priority: dataUB.Priority})
	return c.JSON(issue)
}

func DeleteIssue(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DBConn

	var issue models.Issue
	db.First(&issue, id)
	if issue.Title == "" {
		c.SendString("No issue Found with ID")

	}
	db.Delete(&issue)
	return c.SendString("Issue Successfully deleted")
}
