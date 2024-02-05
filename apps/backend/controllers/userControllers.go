package controllers

import (
	"encoding/json"
	"exam-app/backend/initializers"
	"exam-app/backend/models"
	"fmt"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {
	// Get the email/pass off req bodyu
	var body struct {
		Name     string
		Email    string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadGateway, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	// hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{
			"error": "Failed to hash password",
		})
		return
	}

	// Create the user
	user := models.User{Name: body.Name, Email: body.Email, Password: string(hash)}
	result := initializers.Db.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadGateway, gin.H{
			"error": "Failed to creat user",
		})
		return
	}

	// Respond
	c.JSON(http.StatusCreated, user)
}

func GetAllUsers(c *gin.Context) {
	var users []models.User
	initializers.Db.Find(&users)

	c.JSON(http.StatusOK, users)
}

// By admin only
func CreateUsers(c *gin.Context) {
	var users []models.User

	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.AbortWithError(400, err)
		return
	}
	fmt.Println(string(body))

	err = json.Unmarshal(body, &users)

	if err != nil {
		c.AbortWithError(400, err)
		return
	}

	result := initializers.Db.Create(&users)
	if result.Error != nil {
		c.AbortWithStatus(500)
		return
	}

	c.JSON(http.StatusCreated, users)
}

func GetOneUser(c *gin.Context) {
	id := c.Param("id")

	var user models.User
	result := initializers.Db.First(&user, id)
	if result.Error != nil {
		fmt.Println(result.Error)
	}
	if user.ID == 0 {
		c.JSON(http.StatusOK, gin.H{})
		return
	}

	c.JSON(http.StatusOK, user)
}

func UpdateOneUser(c *gin.Context) {
	// get the id
	id := c.Param("id")
	var post models.User
	initializers.Db.First(&post, id)

	//
	var body struct {
		Name string
	}
	c.Bind(&body)

	initializers.Db.Model(&post).Updates(models.User{
		Name: body.Name,
	})

	c.JSON(200, post)
}

func DeleteOneUser(c *gin.Context) {
	id := c.Param("id")

	initializers.Db.Delete(&models.User{}, id)

	// response
	c.Status(202)
}
