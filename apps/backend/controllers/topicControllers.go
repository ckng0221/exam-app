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
	result := initializers.Db.First(&topic, id)
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
