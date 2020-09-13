package models

import (
	"jira-clone/database"

	"github.com/gofiber/fiber"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

type Comment struct {
	gorm.Model
	Content string `json:"content"`
	IssueID uint
}

func GetComments(c *fiber.Ctx) {
	db := database.DBConn
	var comments []Comment
	db.Find(&comments)
	c.JSON(comments)
}

func GetComment(c *fiber.Ctx) {
	id := c.Params("id")
	db := database.DBConn
	var comment Comment
	db.Find(&comment, id)
	c.JSON(comment)
}

func NewComment(c *fiber.Ctx) {
	db := database.DBConn
	comment := new(Comment)
	if err := c.BodyParser(comment); err != nil {
		c.Status(503).Send(err)
		return
	}
	db.Create(&comment)
	c.JSON(comment)
}

func UpdateComment(c *fiber.Ctx) {
	type DataUpdateComment struct {
		Content string `json:"content"`
	}
	var dataUB DataUpdateComment
	if err := c.BodyParser(&dataUB); err != nil {
		c.Status(503).Send(err)
		return
	}
	var comment Comment
	id := c.Params("id")
	db := database.DBConn
	db.First(&comment, id)

	comment = Comment{
		Content: dataUB.Content,
	}
	db.Save(&comment)
	c.JSON(comment)
}

func DeleteComment(c *fiber.Ctx) {
	id := c.Params("id")
	db := database.DBConn

	var comment Comment
	db.First(&comment, id)
	if comment.Content == "" {
		c.Status(500).Send("No comment Found with ID")
		return
	}
	db.Delete(&comment)
	c.Send("Comment Successfully deleted")
}
