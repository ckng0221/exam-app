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
	r.GET("/topics/:id/questions/count", controllers.GetOneTopicQuestionsCount)
	r.PATCH("/topics/:id", controllers.UpdateOneTopic)
	r.DELETE("/topics/:id", controllers.DeleteOneTopic)

	// Topic Questions
	r.GET("/topic-questions", controllers.GetAllTopicQuestions)
	r.POST("/topic-questions", controllers.CreateTopicQuestions)
	r.GET("/topic-questions/:id", controllers.GetOneTopicQuestion)
	r.PATCH("/topic-questions/:id", controllers.UpdateOneTopicQuestion)
	r.DELETE("/topic-questions/:id", controllers.DeleteOneTopicQuestion)

	// Question Options
	r.GET("/question-options", controllers.GetAllQuestionOptions)
	r.POST("/question-options", controllers.CreateQuestionOptions)
	r.GET("/question-options/:id", controllers.GetOneQuestionOption)
	r.PATCH("/question-options/:id", controllers.UpdateOneQuestionOption)
	r.DELETE("/question-options/:id", controllers.DeleteOneQuestionOption)

	return r
}
