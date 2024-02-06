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

// Topics
func GetAllTopics(c *gin.Context) {
	var topics []models.Topic
	initializers.Db.Find(&topics)

	c.JSON(http.StatusOK, topics)
}

func CreateTopics(c *gin.Context) {
	var topics []models.Topic

	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.AbortWithError(400, err)
		return
	}
	fmt.Println(string(body))

	err = json.Unmarshal(body, &topics)

	if err != nil {
		c.AbortWithError(400, err)
		return
	}

	result := initializers.Db.Create(&topics)
	if result.Error != nil {
		c.AbortWithStatus(500)
		return
	}

	c.JSON(http.StatusCreated, topics)
}

func GetOneTopic(c *gin.Context) {
	id := c.Param("id")

	var topic models.Topic
	result := initializers.Db.Preload("TopicQuestions").First(&topic, id)
	if result.Error != nil {
		fmt.Println(result.Error)
	}
	if topic.ID == 0 {
		c.JSON(http.StatusOK, gin.H{})
		return
	}

	c.JSON(http.StatusOK, topic)
}

func UpdateOneTopic(c *gin.Context) {
	// get the id
	id := c.Param("id")
	var post models.Topic
	initializers.Db.First(&post, id)

	//
	var body struct {
		Name string
	}
	c.Bind(&body)

	initializers.Db.Model(&post).Updates(models.Topic{
		Name: body.Name,
	})

	c.JSON(200, post)
}

func DeleteOneTopic(c *gin.Context) {
	id := c.Param("id")

	initializers.Db.Delete(&models.Topic{}, id)

	// response
	c.Status(202)
}

func GetOneTopicQuestions(c *gin.Context) {
	id := c.Param("id")

	var topicQuestions []models.TopicQuestion
	initializers.Db.Find(&topicQuestions).Where("topic_id = ?", id)

	c.JSON(http.StatusOK, topicQuestions)
}

// Questions
func GetAllTopicQuestions(c *gin.Context) {
	var topicQuestions []models.TopicQuestion
	initializers.Db.Find(&topicQuestions)

	c.JSON(http.StatusOK, topicQuestions)
}

func CreateTopicQuestions(c *gin.Context) {
	var topicQuestions []models.TopicQuestion

	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.AbortWithError(400, err)
		return
	}
	// fmt.Println(string(body))

	err = json.Unmarshal(body, &topicQuestions)
	fmt.Println(&topicQuestions)

	if err != nil {
		c.AbortWithError(400, err)
		return
	}

	result := initializers.Db.Create(&topicQuestions)
	if result.Error != nil {
		c.AbortWithStatus(500)
		return
	}

	c.JSON(http.StatusCreated, topicQuestions)
}

func GetOneTopicQuestion(c *gin.Context) {
	id := c.Param("id")

	var topicQuestion models.TopicQuestion
	result := initializers.Db.First(&topicQuestion, id)
	if result.Error != nil {
		fmt.Println(result.Error)
	}
	if topicQuestion.ID == 0 {
		c.JSON(http.StatusOK, gin.H{})
		return
	}

	c.JSON(http.StatusOK, topicQuestion)
}

func UpdateOneTopicQuestion(c *gin.Context) {
	// get the id
	id := c.Param("id")
	var post models.TopicQuestion
	initializers.Db.First(&post, id)

	//
	var body struct {
		Question       string
		QuestionNumber uint
		CorrectAnswer  string
		QuestionScore  float32
	}
	c.Bind(&body)

	initializers.Db.Model(&post).Updates(models.TopicQuestion{
		Question:       body.Question,
		QuestionNumber: body.QuestionNumber,
		CorrectAnswer:  body.CorrectAnswer,
		QuestionScore:  body.QuestionScore,
	})

	c.JSON(200, post)
}

func DeleteOneTopicQuestion(c *gin.Context) {
	id := c.Param("id")

	initializers.Db.Delete(&models.TopicQuestion{}, id)

	// response
	c.Status(202)
}
