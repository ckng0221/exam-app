package models

import "gorm.io/gorm"

type Topic struct {
	gorm.Model
	Name string
}

type TopicQuestion struct {
	ID             uint `gorm:"primarykey"`
	Question       string
	QuestionNumber uint
	CorrentAnswer  string `gorm:"type:varchar(10)"`
	QuestionScore  float32
	TopicID        uint
	Topic          Topic
}
