package models

import (
	"jira-clone/database"

	"github.com/gofiber/fiber"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

// User model
type User struct {
	gorm.Model
	Name   string `json:"name"`
	Issues []Issue
}

// GetUsers handler
func GetUsers(c *fiber.Ctx) {
	db := database.DBConn
	var users []User
	// db.Find(&users)
	db.Preload("Issues").Find(&users)
	c.JSON(users)
}

//GetUser handler
func GetUser(c *fiber.Ctx) {
	id := c.Params("id")
	db := database.DBConn
	var user User
	// db.Find(&user, id)
	db.Preload("Issues").Find(&user, id)
	c.JSON(user)
}

// NewUser create handler
func NewUser(c *fiber.Ctx) {
	db := database.DBConn
	user := new(User)
	if err := c.BodyParser(user); err != nil {
		c.Status(503).Send(err)
		return
	}
	db.Create(&user)
	c.JSON(user)
}

//DeleteUser handler
func DeleteUser(c *fiber.Ctx) {
	id := c.Params("id")
	db := database.DBConn

	var user User
	db.First(&user, id)
	if user.Name == "" {
		c.Status(500).Send("No user Found with ID")
		return
	}
	db.Delete(&user)
	c.Send("User Successfully deleted")
}

// TODO: implement preloader on all cases if needed?
