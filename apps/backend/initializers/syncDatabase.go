package initializers

import "exam-app/backend/models"

func SynDatabase() {
	Db.AutoMigrate(
		&models.User{},
		&models.Topic{},
		&models.TopicQuestion{},
		&models.Attempt{},
		&models.AttemptAnswer{},
	)
}
