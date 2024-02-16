package routes

import (
	"exam-app/backend/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())

	// Default
	r.GET("/", func(c *gin.Context) {
		c.String(200, "Hello Exam App")
	})

	// Auth
	AuthRoutes(r)
	// User
	UserRoutes(r)
	// Topic
	TopicRoutes(r)
	// Attempt
	AttemptRoutes(r)

	return r
}
