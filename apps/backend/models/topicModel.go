package models

import "gorm.io/gorm"

type Topic struct {
	gorm.Model
	Name           string           `gorm:"type:varchar(255)"`
	Description    string           `gorm:"type:varchar(255)"`
	TopicQuestions []*TopicQuestion `json:",omitempty"`
}

type TopicQuestion struct {
	ID             uint `gorm:"primarykey"`
	Question       string
	QuestionNumber uint   `gorm:"uniqueIndex:compositeindex; index; not null"`
	CorrectAnswer  string `gorm:"type:varchar(10)"`
	QuestionScore  float32
	TopicID        uint   `gorm:"uniqueIndex:compositeindex; index; not null"`
	Topic          *Topic `json:",omitempty"`
}
