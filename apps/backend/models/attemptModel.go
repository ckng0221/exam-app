package models

import (
	"time"

	"gorm.io/gorm"
)

type Attempt struct {
	gorm.Model
	Score          float32
	UserID         uint
	User           *User `json:",omitempty"`
	TopicID        uint
	Topic          *Topic          `json:",omitempty"`
	IsSubmitted    bool            `gorm:"default: false"`
	SubmitDate     *time.Time      `json:",omitempty"`
	AttemptAnswers []AttemptAnswer `json:",omitempty"`
}

type AttemptAnswer struct {
	gorm.Model
	AttemptID  uint
	Attempt    *Attempt `json:",omitempty"`
	QuestionID uint
	Question   *TopicQuestion `json:",omitempty"`
	Answer     string         `gorm:"type:varchar(10)"`
}
