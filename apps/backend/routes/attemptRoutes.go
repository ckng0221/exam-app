package routes

import (
	"exam-app/backend/controllers"
	"exam-app/backend/middleware"

	"github.com/gin-gonic/gin"
)

func AttemptRoutes(r *gin.Engine) *gin.Engine {

	// Attempts
	r.GET("/attempts", controllers.GetAllAttempts)
	r.POST("/attempts", middleware.RequireAuth, controllers.CreateAttempts)
	r.GET("/attempts/:id", controllers.GetOneAttempt)
	r.GET("/attempts/:id/answers", controllers.GetOneAttemptAnswers)
	r.POST("/attempts/:id/submit", controllers.SubmitOneAttempt)
	r.PATCH("/attempts/:id", controllers.UpdateOneAttempt)
	r.DELETE("/attempts/:id", controllers.DeleteOneAttempt)

	// Attempt Answers
	r.GET("/attempt-answers", controllers.GetAllAttemptAnswers)
	r.POST("/attempt-answers", controllers.CreateAttemptAnswers)
	r.PUT("/attempt-answers", controllers.CreateOrUpdateAttemptAnswer)
	r.GET("/attempt-answers/:id", controllers.GetOneAttemptAnswer)
	r.PATCH("/attempt-answers/:id", controllers.UpdateOneAttemptAnswer)
	r.DELETE("/attempt-answers/:id", controllers.DeleteOneAttemptAnswer)
	return r
}
