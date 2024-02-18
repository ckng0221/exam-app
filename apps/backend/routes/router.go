package routes

import (
	"exam-app/backend/middleware"

	"github.com/gin-gonic/gin"

	docs "exam-app/backend/docs"

	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @Summary Health check
// @Tags Default
// @Produce json
// @Success 200
// @Router / [get]
func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())

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

	docs.SwaggerInfo.BasePath = ""

	// url := ginSwagger.URL("http://localhost:8000/swagger/doc.json")
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	// http://localhost:8000/swagger/index.html

	return r
}
