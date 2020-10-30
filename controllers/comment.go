package controllers

import (
	"kanban-app/database"
	"kanban-app/models"

	"github.com/gofiber/fiber/v2"
)

func GetComments(c *fiber.Ctx) error {
	db := database.DBConn
	var comments []models.Comment
	db.Find(&comments)
	return c.JSON(comments)
}

func GetComment(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DBConn
	var comment models.Comment
	db.Find(&comment, id)
	return c.JSON(comment)
}

func NewComment(c *fiber.Ctx) error {
	db := database.DBConn
	comment := new(models.Comment)
	if err := c.BodyParser(comment); err != nil {
		c.SendStatus(503)

	}
	db.Create(&comment)
	return c.JSON(comment)
}

func UpdateComment(c *fiber.Ctx) error {
	type DataUpdateComment struct {
		Content string `json:"content"`
	}
	var dataUB DataUpdateComment
	if err := c.BodyParser(&dataUB); err != nil {
		c.SendStatus(503)

	}
	var comment models.Comment
	id := c.Params("id")
	db := database.DBConn
	db.First(&comment, id)
	if comment.Content == "" {
		c.SendString("No comment Found with ID")

	}

	db.Model(&comment).Update("content", dataUB.Content)
	return c.JSON(comment)
}

func DeleteComment(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DBConn

	var comment models.Comment
	db.First(&comment, id)
	if comment.Content == "" {
		c.SendString("No comment Found with ID")

	}
	db.Delete(&comment)
	return c.SendString("Comment Successfully deleted")
}
