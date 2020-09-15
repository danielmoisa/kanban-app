package controllers

import (
	"jira-clone/database"
	"jira-clone/models"

	"github.com/gofiber/fiber/v2"
)

// GetUsers handler
func GetUsers(c *fiber.Ctx) error {
	db := database.DBConn
	var users []models.User
	db.Preload("Projects.Issues.Comments").Find(&users)
	return c.JSON(users)
}

//GetUser handler
func GetUser(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DBConn
	var user models.User
	db.Preload("Projects.Issues.Comments").Find(&user, id)
	return c.JSON(user)
}

// NewUser create handler
func NewUser(c *fiber.Ctx) error {
	db := database.DBConn
	user := new(models.User)
	if err := c.BodyParser(user); err != nil {
		c.SendStatus(503)

	}
	db.Create(&user)
	return c.JSON(user)
}

func UpdateUser(c *fiber.Ctx) error {
	type DataUpdateUser struct {
		Name string `json:"name"`
	}
	var dataUB DataUpdateUser
	if err := c.BodyParser(&dataUB); err != nil {
		c.SendStatus(503)

	}
	var user models.User
	id := c.Params("id")
	db := database.DBConn
	db.First(&user, id)
	if user.Name == "" {
		c.SendString("No user Found with ID")

	}

	db.Model(&user).Update("name", dataUB.Name)
	return c.JSON(user)
}

//DeleteUser handler
func DeleteUser(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DBConn

	var user models.User
	db.First(&user, id)
	if user.Name == "" {
		c.SendString("No user Found with ID")

	}
	db.Delete(&user)
	return c.SendString("User Successfully deleted")
}
