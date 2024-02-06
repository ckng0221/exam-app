package routes

import (
	"exam-app/backend/controllers"

	"github.com/gin-gonic/gin"
)

func AttemptRoutes(r *gin.Engine) *gin.Engine {

	// Attempts
	r.GET("/attempts", controllers.GetAllAttempts)
	r.POST("/attempts", controllers.CreateAttempts)
	r.GET("/attempts/:id", controllers.GetOneAttempt)
	r.GET("/attempts/:id/answers", controllers.GetOneAttemptAnswers)
	r.PATCH("/attempts/:id", controllers.UpdateOneAttempt)
	r.DELETE("/attempts/:id", controllers.DeleteOneAttempt)

	// Attempt Answers
	r.GET("/attempt-answers", controllers.GetAllAttemptAnswers)
	r.POST("/attempt-answers", controllers.CreateAttemptAnswers)
	r.GET("/attempt-answers/:id", controllers.GetOneAttemptAnswer)
	r.PATCH("/attempt-answers/:id", controllers.UpdateOneAttemptAnswer)
	r.DELETE("/attempt-answers/:id", controllers.DeleteOneAttemptAnswer)
	return r
}
