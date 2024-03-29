package controllers

import (
	"encoding/json"
	"exam-app/backend/initializers"
	"exam-app/backend/models"
	"fmt"
	"io"
	"net/http"
	"slices"
	"time"

	"github.com/gin-gonic/gin"
)

// Attempts

// @Summary Get all attempts
// @Tags Attempt
// @Accept json
// @Produce json
// @Success 200
// @Router /attempts [get]
func GetAllAttempts(c *gin.Context) {

	userId := c.Query("user_id")
	topicId := c.Query("topic_id")

	m := make(map[string]interface{})

	if userId != "" {
		m["user_id"] = userId
	}
	if topicId != "" {
		m["topic_id"] = topicId
	}

	var attempts []models.Attempt
	initializers.Db.Where(m).Find(&attempts)
	c.JSON(http.StatusOK, attempts)
}

type CreateAttempt struct {
	UserId  uint
	TopicId uint
}

// @Summary Create attempts
// @Tags Attempt
// @Param   body body []CreateAttempt true "Attempts"
// @Accept json
// @Produce json
// @Success 201
// @Router /attempts [post]
func CreateAttempts(c *gin.Context) {
	var attempts []models.Attempt

	user, _ := c.Get("user")
	userId := user.(models.User).ID

	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.AbortWithError(400, err)
		return
	}
	// fmt.Println(string(body))

	var attemptsInterface []map[string]interface{}

	// Custom modification
	err = json.Unmarshal(body, &attemptsInterface)
	if err != nil {
		c.AbortWithError(400, err)
		return
	}
	for _, attempt := range attemptsInterface {
		// Add user ID based on cookie
		attempt["UserID"] = userId
	}
	// fmt.Println(attemptsInterface)
	newAttempts, _ := json.Marshal(attemptsInterface)

	err = json.Unmarshal(newAttempts, &attempts)

	if err != nil {
		c.AbortWithError(400, err)
		return
	}

	result := initializers.Db.Create(&attempts)
	if result.Error != nil {
		fmt.Println(result.Error)
		c.AbortWithStatus(500)
		return
	}

	c.JSON(http.StatusCreated, attempts)
}

// @Summary Get one attempt
// @Tags Attempt
// @Param id path int true "ID"
// @Accept json
// @Produce json
// @Success 200
// @Router /attempts/{id} [get]
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

func SubmitOneAttempt(c *gin.Context) {
	id := c.Param("id")

	var attempt models.Attempt
	initializers.Db.First(&attempt, id)

	if attempt.IsSubmitted {
		c.AbortWithStatusJSON(422, gin.H{"error": "Already submitted"})
		return
	}

	var topic models.Topic
	initializers.Db.Table("topics as t").
		Select("t.*, q.total_score").
		Joins("JOIN (SELECT topic_id, SUM(question_score) AS total_score FROM topic_questions GROUP BY topic_id) AS q ON t.id = q.topic_id").
		Where("t.id = ?", attempt.TopicID).Scan(&topic)

	var correctAnswers []models.TopicQuestion
	initializers.Db.Where("topic_id = ?", attempt.TopicID).Find(&correctAnswers)

	var attemptAnswers []models.AttemptAnswer
	initializers.Db.Where("attempt_id = ?", id).Find(&attemptAnswers)

	var finalScore float32
	for i := 0; i < len(attemptAnswers); i++ {
		questionId := attemptAnswers[i].QuestionID
		answer := attemptAnswers[i].Answer

		// Get index of correct answer from topic Questions
		correctAnswerIndex := slices.IndexFunc(attemptAnswers, func(c models.AttemptAnswer) bool { return c.QuestionID == questionId })
		correctAnwer := correctAnswers[correctAnswerIndex].CorrectAnswer
		correctScore := correctAnswers[correctAnswerIndex].QuestionScore

		if answer == correctAnwer {
			fmt.Println("correct!")
			finalScore += correctScore
		}
		fmt.Println("Wrong!")
	}
	var submitDate = time.Now().UTC()

	// Calculate Percentage
	finalScorePercentage := finalScore / topic.TotalScore * 100

	isPass := false
	if finalScorePercentage > topic.PassPercentage {
		isPass = true
	}

	// Update Attempt
	initializers.Db.Model(&attempt).Updates(models.Attempt{
		Score:           finalScore,
		IsSubmitted:     true,
		SubmitDate:      &submitDate,
		ScorePercentage: finalScorePercentage,
		IsPass:          isPass,
	})

	c.JSON(http.StatusOK, gin.H{"score": finalScore, "Submit Date": submitDate, "topic": topic})
}

func DeleteOneAttempt(c *gin.Context) {
	id := c.Param("id")

	initializers.Db.Delete(&models.Attempt{}, id)

	// response
	c.Status(202)
}

func GetOneAttemptAnswers(c *gin.Context) {
	id := c.Param("id")
	questionId := c.Query("questionid")

	m := make(map[string]interface{})
	m["attempt_id"] = id

	if questionId != "" {
		m["question_id"] = questionId
	}
	var attemptAnswers []models.AttemptAnswer
	initializers.Db.Where(m).Find(&attemptAnswers)
	c.JSON(http.StatusOK, attemptAnswers)

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

func CreateOrUpdateAttemptAnswer(c *gin.Context) {

	var attemptAnswer models.AttemptAnswer

	var body struct {
		AttemptId  uint
		QuestionId uint
		Answer     string
	}
	c.Bind(&body)

	initializers.Db.Where("attempt_id = ? AND question_id = ?", body.AttemptId, body.QuestionId).First(&attemptAnswer)

	if attemptAnswer.ID != 0 {
		initializers.Db.Model(&attemptAnswer).Updates(models.AttemptAnswer{
			AttemptID:  body.AttemptId,
			QuestionID: body.QuestionId,
			Answer:     body.Answer,
		})

		c.JSON(200, attemptAnswer)

	} else {
		answer := models.AttemptAnswer{
			AttemptID:  body.AttemptId,
			QuestionID: body.QuestionId,
			Answer:     body.Answer,
		}

		result := initializers.Db.Create(&answer)
		if result.Error != nil {
			c.AbortWithStatus(500)
			return
		}
		c.JSON(http.StatusCreated, attemptAnswer)
	}
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
