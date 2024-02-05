package routes

import (
	"exam-app/backend/controllers"

	"github.com/gin-gonic/gin"
)

func TopicRoutes(r *gin.Engine) *gin.Engine {

	r.GET("/topics", controllers.GetAllTopics)
	r.POST("/topics", controllers.CreateTopics)
	r.GET("/topics/:id", controllers.GetOneTopic)
	r.PATCH("/topics/:id", controllers.UpdateOneTopic)
	r.DELETE("/topics/:id", controllers.DeleteOneTopic)
	return r
}
