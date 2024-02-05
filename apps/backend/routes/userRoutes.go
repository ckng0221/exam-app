package routes

import (
	"exam-app/backend/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoutes(r *gin.Engine) *gin.Engine {

	r.POST("/signup", controllers.Signup)
	r.GET("/users", controllers.GetAllUsers)
	r.POST("/users", controllers.CreateUsers)
	r.GET("/users/:id", controllers.GetOneUser)
	r.PATCH("/users/:id", controllers.UpdateOneUser)
	r.DELETE("/users/:id", controllers.DeleteOneUser)

	// Auth

	return r
}
