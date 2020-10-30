package controllers

import (
	"kanban-app/database"
	"kanban-app/models"
	"strconv"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func validToken(t *jwt.Token, id string) bool {
	n, err := strconv.Atoi(id)
	if err != nil {
		return false
	}

	claims := t.Claims.(jwt.MapClaims)
	uid := int(claims["user_id"].(float64))

	if uid != n {
		return false
	}

	return true
}

func validUser(id string, p string) bool {
	db := database.DBConn
	var user models.User
	db.First(&user, id)
	if user.Username == "" {
		return false
	}
	if !CheckPasswordHash(p, user.Password) {
		return false
	}
	return true
}

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
	type NewUser struct {
		Username string `json:"username"`
		Email    string `json:"email"`
	}
	db := database.DBConn
	user := new(models.User)
	if err := c.BodyParser(user); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})

	}

	hash, err := hashPassword(user.Password)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't hash password", "data": err})

	}

	user.Password = hash
	if err := db.Create(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't create user", "data": err})
	}

	newUser := NewUser{
		Email:    user.Email,
		Username: user.Username,
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Created user", "data": newUser})
}

func UpdateUser(c *fiber.Ctx) error {
	type DataUpdateUser struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	var dataUB DataUpdateUser
	if err := c.BodyParser(&dataUB); err != nil {
		c.SendStatus(503)

	}
	var user models.User
	id := c.Params("id")
	db := database.DBConn
	db.First(&user, id)
	if user.Username == "" {
		c.SendString("No user Found with ID")

	}
	db.Model(&user).Updates(models.User{Username: dataUB.Username, Email: dataUB.Email, Password: dataUB.Password})
	return c.JSON(user)
}

//DeleteUser handler
func DeleteUser(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DBConn

	var user models.User
	db.First(&user, id)
	if user.Username == "" {
		c.SendString("No user Found with ID")

	}
	db.Delete(&user)
	return c.SendString("User Successfully deleted")
}
