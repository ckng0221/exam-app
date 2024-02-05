package routes

import (
	"exam-app/backend/controllers"

	"github.com/gin-gonic/gin"
)

func AttemptRoutes(r *gin.Engine) *gin.Engine {

	r.GET("/attempts", controllers.GetAllAttempts)
	r.POST("/attempts", controllers.CreateAttempts)
	r.GET("/attempts/:id", controllers.GetOneAttempt)
	r.PATCH("/attempts/:id", controllers.UpdateOneAttempt)
	r.DELETE("/attempts/:id", controllers.DeleteOneAttempt)
	return r
}
