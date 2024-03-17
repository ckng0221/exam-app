package routes

import (
	"exam-app/backend/controllers"
	"exam-app/backend/middleware"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.RouterGroup) {

	r.POST("/login", controllers.Login)
	r.POST("/logout", controllers.Logout)
	r.GET("/validate", middleware.RequireAuth, controllers.Validate)
}
