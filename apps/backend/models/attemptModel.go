package models

import "gorm.io/gorm"

type Attempt struct {
	gorm.Model
	Score   float32
	UserID  uint
	User    *User `json:",omitempty"`
	TopicID uint
	Topic   *Topic `json:",omitempty"`
}

type AttemptAnswer struct {
	gorm.Model
	AttemptID  uint
	Attempt    *Attempt `json:",omitempty"`
	QuestionID uint
	Question   *TopicQuestion `json:",omitempty"`
	Answer     string         `gorm:"type:varchar(10)"`
}
