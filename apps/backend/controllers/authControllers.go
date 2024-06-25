package controllers

import (
	"bytes"
	"encoding/json"
	"exam-app/backend/initializers"
	"exam-app/backend/models"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

func Login(c *gin.Context) {
	// Get the email and pass off req body
	var body struct {
		Email          string `json:"email"`
		Password       string `json:"password"`
		TurnstileToken string `json:"turnstile_token"`
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadGateway, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	// TODO: validate
	// fmt.Println("token", body.TurnstileToken)
	// validate Turnstile Token
	turnstileUrl := os.Getenv("TURNSTILE_URL")

	// form := url.Values{}
	// form.Add("secret", os.Getenv("TURNSTILE_SECRET_KEY"))
	// form.Add("response", body.TurnstileToken)
	payload := struct {
		Secret   string `json:"secret"`
		Response string `json:"response"`
	}{
		Secret:   os.Getenv("TURNSTILE_SECRET_KEY"),
		Response: body.TurnstileToken,
	}
	payloadByte, err := json.Marshal(&payload)
	if err != nil {
		c.AbortWithStatus(500)
		log.Println("Failed to marshal payload")
		return
	}
	req, err := http.NewRequest("POST", turnstileUrl, bytes.NewBuffer(payloadByte))
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		c.AbortWithStatus(500)
		log.Println("Failed to process request for Turnstile")
		return
	}
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		c.AbortWithStatus(500)
		log.Println("Failed to send request for Turnstile validation")
		return
	}
	resBody, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Println("Failed to get response body")
	}
	turnstileRes := struct {
		Success      bool   `json:"success"`
		ErrorCodes   any    `json:"error-codes"`
		ChallengesTs string `json:"challenge_ts"`
		Hostname     string `json:"hostname"`
		Action       string `json:"action"`
	}{}

	err = json.Unmarshal(resBody, &turnstileRes)
	if err != nil {
		log.Println("Failed to unmarshal Turnstile Response")
	}
	if turnstileRes.Success {
		log.Println("Turnstile validation successful")
	} else {
		log.Println("Turnstile validation failed")
		// optional, to block if failed validation
		// c.JSON(http.StatusUnauthorized, gin.H{
		// 	"error": "Failed Turnstile validation",
		// })
	}

	// Look up requested user
	var user models.User
	initializers.Db.First(&user, "email = ?", body.Email)

	if user.ID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	// Compare sent in pass with saved user pass hash
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	// generate jwt
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{
			"error": "Failed to create token",
		})
		return
	}

	// Set cookies
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)

	// respond
	c.JSON(http.StatusOK, gin.H{
		"name":         user.Name,
		"access_token": tokenString,
	})
	// c.JSON(http.StatusOK, gin.H{})
}

func Validate(c *gin.Context) {
	user, _ := c.Get("user")

	c.JSON(http.StatusOK, user)
}

func Logout(c *gin.Context) {
	// Set cookies
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", "", -1, "", "", false, true)

	// respond
	c.JSON(http.StatusOK, gin.H{
		"message": "logged out",
	})
}

func Signup(c *gin.Context) {
	// Get the email/pass off req bodyu
	var body struct {
		Name     string
		Email    string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadGateway, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	// hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{
			"error": "Failed to hash password",
		})
		return
	}

	// Create the user
	user := models.User{Name: body.Name, Email: body.Email, Password: string(hash), Role: "member"}
	result := initializers.Db.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadGateway, gin.H{
			"error": "Failed to create user",
		})
		return
	}

	// Respond
	c.JSON(http.StatusCreated, user)
}
