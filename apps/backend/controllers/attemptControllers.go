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

// Attempts
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
	result := initializers.Db.Preload("User").Preload("Topic").First(&attempt, id)
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
		Score     float32
		UserId    uint
		AttemptId uint
	}
	c.Bind(&body)

	initializers.Db.Model(&post).Updates(models.Attempt{
		Score:   body.Score,
		UserID:  body.UserId,
		TopicID: body.AttemptId,
	})

	c.JSON(200, post)
}

func DeleteOneAttempt(c *gin.Context) {
	id := c.Param("id")

	initializers.Db.Delete(&models.Attempt{}, id)

	// response
	c.Status(202)
}

func GetOneAttemptAnswers(c *gin.Context) {
	id := c.Param("id")

	var attemptQuestions []models.AttemptAnswer
	initializers.Db.Find(&attemptQuestions).Where("attempt_id = ?", id)

	c.JSON(http.StatusOK, attemptQuestions)
}

// Answers
func GetAllAttemptAnswers(c *gin.Context) {
	var attemptAnswers []models.AttemptAnswer
	initializers.Db.Find(&attemptAnswers)

	c.JSON(http.StatusOK, attemptAnswers)
}

func CreateAttemptAnswers(c *gin.Context) {
	var attemptAnswers []models.AttemptAnswer

	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.AbortWithError(400, err)
		return
	}
	fmt.Println(string(body))

	err = json.Unmarshal(body, &attemptAnswers)

	if err != nil {
		c.AbortWithError(400, err)
		return
	}

	result := initializers.Db.Create(&attemptAnswers)
	if result.Error != nil {
		c.AbortWithStatus(500)
		return
	}

	c.JSON(http.StatusCreated, attemptAnswers)
}

func GetOneAttemptAnswer(c *gin.Context) {
	id := c.Param("id")

	var attemptAnswer models.AttemptAnswer
	result := initializers.Db.First(&attemptAnswer, id)
	if result.Error != nil {
		fmt.Println(result.Error)
	}
	if attemptAnswer.ID == 0 {
		c.JSON(http.StatusOK, gin.H{})
		return
	}

	c.JSON(http.StatusOK, attemptAnswer)
}

func UpdateOneAttemptAnswer(c *gin.Context) {
	// get the id
	id := c.Param("id")
	var post models.AttemptAnswer
	initializers.Db.First(&post, id)

	//
	var body struct {
		AttemptId  uint
		QuestionId uint
		Answer     string
	}
	c.Bind(&body)

	initializers.Db.Model(&post).Updates(models.AttemptAnswer{
		AttemptID:  body.AttemptId,
		QuestionID: body.QuestionId,
		Answer:     body.Answer,
	})

	c.JSON(200, post)
}

func DeleteOneAttemptAnswer(c *gin.Context) {
	id := c.Param("id")

	initializers.Db.Delete(&models.AttemptAnswer{}, id)

	// response
	c.Status(202)
}
