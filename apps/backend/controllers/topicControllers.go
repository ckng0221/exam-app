package controllers

import (
	"encoding/json"
	"exam-app/backend/initializers"
	"exam-app/backend/models"
	"exam-app/backend/utils"
	"fmt"
	"io"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Topics

// @Summary Get all topics
// @Tags Topic
// @Accept json
// @Produce json
// @Success 200
// @Router /topics [get]
func GetAllTopics(c *gin.Context) {
	published := c.Query("published")

	var topics []models.Topic
	m := make(map[string]interface{})
	if published != "" {
		boolValue, err := strconv.ParseBool(published)
		if err != nil {
			log.Fatal(err)
		}
		m["is_published"] = boolValue
	}

	initializers.Db.Scopes(utils.Paginate(c)).Where(m).Find(&topics)
	// initializers.Db.Scopes(utils.Paginate(c)).Preload("TopicQuestions.QuestionOptions").Where(m).Find(&topics)

	c.JSON(http.StatusOK, topics)
}

type CreateTopic struct {
	Name        string
	Description string
}

// @Summary Create topics
// @Tags Topic
// @Param   body body []CreateTopic true "Topics"
// @Accept json
// @Produce json
// @Success 201
// @Router /topics [post]
func CreateTopics(c *gin.Context) {
	var topics []models.Topic

	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.AbortWithError(400, err)
		return
	}
	// fmt.Println(string(body))

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

// @Summary Get one topic
// @Tags Topic
// @Param id path int true "ID"
// @Accept json
// @Produce json
// @Success 200
// @Router /topics/{id} [get]
func GetOneTopic(c *gin.Context) {
	id := c.Param("id")

	var topic models.Topic
	verbose := c.Query("verbose")

	isVerbose, err := strconv.ParseBool(verbose)
	if err != nil {
		isVerbose = false
	}

	var result *gorm.DB
	if isVerbose {
		result = initializers.Db.Preload("TopicQuestions.QuestionOptions").First(&topic, id)
	} else {
		result = initializers.Db.First(&topic, id)
	}

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
	var topic models.Topic
	initializers.Db.First(&topic, id)

	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.AbortWithError(400, err)
		return
	}
	fmt.Println(string(body))
	var topicM map[string]interface{}

	err = json.Unmarshal(body, &topicM)

	if err != nil {
		c.AbortWithError(400, err)
		return
	}

	initializers.Db.Model(&topic).Updates(&topicM)

	c.JSON(200, topic)
}

func DeleteOneTopic(c *gin.Context) {
	id := c.Param("id")

	initializers.Db.Delete(&models.Topic{}, id)

	// response
	c.Status(202)
}

func GetOneTopicQuestions(c *gin.Context) {
	id := c.Param("id")
	options := c.Query("options")

	var topicQuestions []models.TopicQuestion
	m := make(map[string]interface{})
	m["topic_id"] = id

	getOptions, err := strconv.ParseBool(options)

	if err != nil {
		getOptions = false
	}

	if getOptions {
		initializers.Db.Preload("QuestionOptions").Scopes(utils.Paginate(c)).Where(m).Find(&topicQuestions).Order("ID")
	} else {
		initializers.Db.Scopes(utils.Paginate(c)).Where(m).Find(&topicQuestions).Order("ID")
	}
	c.JSON(http.StatusOK, topicQuestions)
}

func GetOneTopicQuestionsCount(c *gin.Context) {
	id := c.Param("id")

	var topicQuestions []models.TopicQuestion
	m := make(map[string]interface{})
	m["topic_id"] = id

	var totalQuestions int64
	initializers.Db.Where(m).Find(&topicQuestions).Count(&totalQuestions)
	c.JSON(http.StatusOK, totalQuestions)
}

// Questions
func GetAllTopicQuestions(c *gin.Context) {
	var topicQuestions []models.TopicQuestion
	initializers.Db.Scopes(utils.Paginate(c)).Find(&topicQuestions)

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
	// fmt.Println(&topicQuestions)

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
	result := initializers.Db.Preload("QuestionOptions").First(&topicQuestion, id)
	if result.Error != nil {
		fmt.Println(result.Error)
	}
	if topicQuestion.ID == 0 {
		c.JSON(http.StatusOK, gin.H{})
		return
	}

	c.JSON(http.StatusOK, topicQuestion)
}

// Hide fields that shouldn't present with advanced query
func GetOneTopicQuestionSafe(c *gin.Context) {
	id := c.Param("id")

	var topicQuestionSafe models.TopicQuestionSafe
	result := initializers.Db.Model(&models.TopicQuestion{}).Preload("QuestionOptions").First(&topicQuestionSafe, id)
	if result.Error != nil {
		fmt.Println(result.Error)
	}
	if topicQuestionSafe.ID == 0 {
		c.JSON(http.StatusOK, gin.H{})
		return
	}

	c.JSON(http.StatusOK, topicQuestionSafe)
}

func UpdateOneTopicQuestion(c *gin.Context) {
	// get the id
	id := c.Param("id")
	var post models.TopicQuestion
	initializers.Db.First(&post, id)

	//
	var body struct {
		Question      string
		CorrectAnswer string
		QuestionScore float32
	}
	c.Bind(&body)

	initializers.Db.Model(&post).Updates(models.TopicQuestion{
		Question:      body.Question,
		CorrectAnswer: body.CorrectAnswer,
		QuestionScore: body.QuestionScore,
	})

	c.JSON(200, post)
}

func DeleteOneTopicQuestion(c *gin.Context) {
	id := c.Param("id")

	initializers.Db.Delete(&models.TopicQuestion{}, id)
	fmt.Println("lalal")

	// response
	c.Status(202)
}

// Question Options
func GetAllQuestionOptions(c *gin.Context) {
	var QuestionOptions []models.QuestionOption
	initializers.Db.Find(&QuestionOptions)

	c.JSON(http.StatusOK, QuestionOptions)
}

func CreateQuestionOptions(c *gin.Context) {
	var QuestionOptions []models.QuestionOption

	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.AbortWithError(400, err)
		return
	}
	// fmt.Println(string(body))

	err = json.Unmarshal(body, &QuestionOptions)
	// fmt.Println(&QuestionOptions)

	if err != nil {
		c.AbortWithError(400, err)
		return
	}

	result := initializers.Db.Create(&QuestionOptions)
	if result.Error != nil {
		c.AbortWithStatus(500)
		return
	}

	c.JSON(http.StatusCreated, QuestionOptions)
}

func GetOneQuestionOption(c *gin.Context) {
	id := c.Param("id")

	var QuestionOption models.QuestionOption
	result := initializers.Db.First(&QuestionOption, id)
	if result.Error != nil {
		fmt.Println(result.Error)
	}
	if QuestionOption.ID == 0 {
		c.JSON(http.StatusOK, gin.H{})
		return
	}

	c.JSON(http.StatusOK, QuestionOption)
}

func UpdateOneQuestionOption(c *gin.Context) {
	// get the id
	id := c.Param("id")
	var post models.QuestionOption
	initializers.Db.First(&post, id)

	//
	var body struct {
		Description string
		OptionCode  string
	}
	c.Bind(&body)

	initializers.Db.Model(&post).Updates(models.QuestionOption{
		Description: body.Description,
		OptionCode:  body.OptionCode,
	})

	c.JSON(200, post)
}

func DeleteOneQuestionOption(c *gin.Context) {
	id := c.Param("id")

	// Hard delete
	initializers.Db.Unscoped().Delete(&models.QuestionOption{}, id)

	// response
	c.Status(202)
}
