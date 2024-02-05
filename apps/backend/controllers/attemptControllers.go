package controllers

import (
	"encoding/json"
	"exam-app/backend/initializers"
	"exam-app/backend/models"
	"fmt"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllAttempts(c *gin.Context) {
	var attempts []models.Attempt
	initializers.Db.Find(&attempts)

	c.JSON(http.StatusOK, attempts)
}

func CreateAttempts(c *gin.Context) {
	var attempts []models.Attempt

	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.AbortWithError(400, err)
		return
	}
	fmt.Println(string(body))

	err = json.Unmarshal(body, &attempts)

	if err != nil {
		c.AbortWithError(400, err)
		return
	}

	result := initializers.Db.Create(&attempts)
	if result.Error != nil {
		c.AbortWithStatus(500)
		return
	}

	c.JSON(http.StatusCreated, attempts)
}

func GetOneAttempt(c *gin.Context) {
	id := c.Param("id")

	var attempt models.Attempt
	result := initializers.Db.First(&attempt, id)
	if result.Error != nil {
		fmt.Println(result.Error)
	}
	if attempt.ID == 0 {
		c.JSON(http.StatusOK, gin.H{})
		return
	}

	c.JSON(http.StatusOK, attempt)
}

func UpdateOneAttempt(c *gin.Context) {
	// get the id
	id := c.Param("id")
	var post models.Attempt
	initializers.Db.First(&post, id)

	//
	var body struct {
		Score      float32
		user_id    uint
		attempt_id uint
	}
	c.Bind(&body)

	initializers.Db.Model(&post).Updates(models.Attempt{
		Score:   body.Score,
		UserID:  body.user_id,
		TopicID: body.attempt_id,
	})

	c.JSON(200, post)
}

func DeleteOneAttempt(c *gin.Context) {
	id := c.Param("id")

	initializers.Db.Delete(&models.Attempt{}, id)

	// response
	c.Status(202)
}
