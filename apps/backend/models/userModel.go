package models

import "gorm.io/gorm"

type Role string

const (
	Admin  Role = "admin"
	Member Role = "member"
)

func (r Role) String() string {
	return string(r)
}

type User struct {
	gorm.Model
	Name       string `gorm:"type:varchar(100)"`
	Email      string `gorm:"unique"`
	Password   string `gorm:"type:varchar(255)" json:"-"`
	Role       Role   `gorm:"type:enum('admin', 'member'); default:member"`
	ProfilePic string `gorm:"type:varchar(255)"`
}

var Roles = [...]Role{Admin, Member}
