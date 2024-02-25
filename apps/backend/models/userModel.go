package models

import "gorm.io/gorm"

type Role string

const (
	Admin  Role = "admin"
	member Role = "member"
)

type User struct {
	gorm.Model
	Name     string `gorm:"type:varchar(100)"`
	Email    string `gorm:"unique"`
	Password string `gorm:"type:varchar(255)" json:"-"`
	Role     string `gorm:"type:enum('admin', 'member') default:member"`
}
