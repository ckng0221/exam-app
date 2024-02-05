package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name     string `gorm:"type:varchar(100)"`
	Email    string `gorm:"unique"`
	Password string `gorm:"type:varchar(255)" json:"-"`
}
