package routes

import (
	"exam-app/backend/controllers"

	"github.com/gin-gonic/gin"
)

func TopicRoutes(r *gin.Engine) *gin.Engine {

	// Topics

	r.GET("/topics", controllers.GetAllTopics)
	r.POST("/topics", controllers.CreateTopics)
	r.GET("/topics/:id", controllers.GetOneTopic)
	r.GET("/topics/:id/questions", controllers.GetOneTopicQuestions)
	r.PATCH("/topics/:id", controllers.UpdateOneTopic)
	r.DELETE("/topics/:id", controllers.DeleteOneTopic)

	// Topic Questions
	r.GET("/topic-questions", controllers.GetAllTopicQuestions)
	r.POST("/topic-questions", controllers.CreateTopicQuestions)
	r.GET("/topic-questions/:id", controllers.GetOneTopicQuestion)
	r.PATCH("/topic-questions/:id", controllers.UpdateOneTopicQuestion)
	r.DELETE("/topic-questions/:id", controllers.DeleteOneTopicQuestion)

	return r
}
