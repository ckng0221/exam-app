package models

import (
	"database/sql"

	"gorm.io/gorm"
)

type DeletedAt sql.NullTime

type Topic struct {
	gorm.Model
	Name           string           `gorm:"type:varchar(255)"`
	Description    string           `gorm:"type:varchar(255)"`
	PassPercentage float32          `json:",omitempty"`
	TopicQuestions []*TopicQuestion `json:",omitempty"`
	IsPublished    bool             `gorm:"default:false"`
	// computed fields
	TotalScore float32 `gorm:"->; -:migration" json:",omitempty"`
}

type TopicQuestion struct {
	gorm.Model

	ID            uint `gorm:"primarykey"`
	Question      string
	CorrectAnswer string `gorm:"type:varchar(10)"`
	// QuestionNumber  uint   `gorm:"uniqueIndex:idx_question_topic"`
	// QuestionOrder  uint   // Do not need unique, to avoid duplicate error. only for sorting //TODO: for future custom ordering, drag and drop on frontend
	QuestionScore   float32
	TopicID         uint
	Topic           *Topic            `json:",omitempty"`
	QuestionOptions []*QuestionOption `json:",omitempty" gorm:"foreignKey:QuestionID"`
}

type TopicQuestionSafe struct {
	ID              uint `gorm:"primarykey"`
	Question        string
	TopicID         uint
	Topic           *Topic            `json:",omitempty"`
	QuestionOptions []*QuestionOption `json:",omitempty" gorm:"foreignKey:QuestionID"`
}

type QuestionOption struct {
	ID          uint `gorm:"primarykey"`
	Description string
	OptionCode  string         `gorm:"type:char(1); uniqueIndex:idx_code"`
	QuestionID  uint           `gorm:"uniqueIndex:idx_code"`
	Question    *TopicQuestion `json:",omitempty"`
}
