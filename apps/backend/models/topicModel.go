package models

import "gorm.io/gorm"

type Topic struct {
	gorm.Model
	Name           string           `gorm:"type:varchar(255)"`
	Description    string           `gorm:"type:varchar(255)"`
	PassPercentage float32          `json:",omitempty"`
	TopicQuestions []*TopicQuestion `json:",omitempty"`
	// computed fields
	TotalScore float32 `gorm:"-:migration" json:",omitempty"`
}

type TopicQuestion struct {
	ID              uint `gorm:"primarykey"`
	Question        string
	QuestionNumber  uint   `gorm:"uniqueIndex:idx_question_topic"`
	CorrectAnswer   string `gorm:"type:varchar(10)"`
	QuestionScore   float32
	TopicID         uint              `gorm:"uniqueIndex:idx_question_topic"`
	Topic           *Topic            `json:",omitempty"`
	QuestionOptions []*QuestionOption `json:",omitempty" gorm:"foreignKey:QuestionID"`
}

type TopicQuestionSafe struct {
	ID              uint `gorm:"primarykey"`
	Question        string
	QuestionNumber  uint              `gorm:"uniqueIndex:idx_question_topic"`
	TopicID         uint              `gorm:"uniqueIndex:idx_question_topic"`
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
