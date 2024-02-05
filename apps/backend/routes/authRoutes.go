package routes

import (
	"exam-app/backend/controllers"
	"exam-app/backend/middleware"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.Engine) *gin.Engine {

	r.POST("/login", controllers.Login)
	r.GET("/validate", middleware.RequireAuth, controllers.Validate)
	return r
}
