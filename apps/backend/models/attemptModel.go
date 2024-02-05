package models

import "gorm.io/gorm"

type Attempt struct {
	gorm.Model
	Score   float32
	UserID  uint
	User    User
	TopicID uint
	Topic   Topic
}

type AttemptAnswer struct {
	gorm.Model
	AttemptID  uint
	Attempt    Attempt
	QuestionID uint
	Question   TopicQuestion
	IsCorrect  bool
}
