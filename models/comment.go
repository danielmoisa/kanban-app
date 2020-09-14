package models

import (
	"jira-clone/database"

	"github.com/gofiber/fiber/v2"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

type Comment struct {
	gorm.Model
	Content string `json:"content"`
	IssueID uint
}

func GetComments(c *fiber.Ctx) error {
	db := database.DBConn
	var comments []Comment
	db.Find(&comments)
	return c.JSON(comments)
}

func GetComment(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DBConn
	var comment Comment
	db.Find(&comment, id)
	return c.JSON(comment)
}

func NewComment(c *fiber.Ctx) error {
	db := database.DBConn
	comment := new(Comment)
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
	var comment Comment
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

	var comment Comment
	db.First(&comment, id)
	if comment.Content == "" {
		c.SendString("No comment Found with ID")

	}
	db.Delete(&comment)
	return c.SendString("Comment Successfully deleted")
}
