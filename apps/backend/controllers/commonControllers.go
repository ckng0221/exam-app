package controllers

// import (
// 	"encoding/json"
// 	"exam-app/backend/initializers"
// 	"fmt"
// 	"io"
// 	"net/http"

// 	"github.com/gin-gonic/gin"
// )

// func GetAll(c *gin.Context, model any) {
// 	var modelObjs []model
// 	initializers.Db.Find(&modelObjs)

// 	c.JSON(http.StatusOK, modelObjs)
// }

// func Create(c *gin.Context, model any) {
// 	var modelObjs []model

// 	body, err := io.ReadAll(c.Request.Body)
// 	if err != nil {
// 		c.AbortWithError(400, err)
// 		return
// 	}
// 	fmt.Println(string(body))

// 	err = json.Unmarshal(body, &modelObjs)

// 	if err != nil {
// 		c.AbortWithError(400, err)
// 		return
// 	}

// 	result := initializers.Db.Create(&modelObjs)
// 	if result.Error != nil {
// 		c.AbortWithStatus(500)
// 		return
// 	}

// 	c.JSON(http.StatusCreated, modelObjs)
// }

// func GetOne(c *gin.Context, model any) {
// 	id := c.Param("id")

// 	var model model
// 	result := initializers.Db.First(&model, id)
// 	if result.Error != nil {
// 		fmt.Println(result.Error)
// 	}
// 	if model.ID == 0 {
// 		c.JSON(http.StatusOK, gin.H{})
// 		return
// 	}

// 	c.JSON(http.StatusOK, model)
// }

// func UpdateOne(c *gin.Context, model any) {
// 	// get the id
// 	id := c.Param("id")
// 	var post model
// 	initializers.Db.First(&post, id)

// 	//
// 	var body struct {
// 		Name string
// 	}
// 	c.Bind(&body)

// 	initializers.Db.Model(&post).Updates(modelObj{
// 		Name: body.Name,
// 	})

// 	c.JSON(200, post)
// }

// func DeleteOne(c *gin.Context, model any) {
// 	id := c.Param("id")

// 	initializers.Db.Delete(&modelObj{}, id)

// 	// response
// 	c.Status(202)
// }
