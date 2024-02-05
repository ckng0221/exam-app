package routes

import (
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

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
