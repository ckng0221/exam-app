package main

import (
	"exam-app/backend/initializers"
	"exam-app/backend/routes"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SynDatabase()
}

func main() {

	r := routes.SetupRouter()

	r.Run()
}

// CompileDaemon -command="./backend"

// generate swagger docs
// swag init --parseDependency --parseInternal
