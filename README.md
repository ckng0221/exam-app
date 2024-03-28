[![Backend-CI](https://github.com/ckng0221/exam-app/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/ckng0221/exam-app/actions/workflows/backend-ci.yml)
[![UI-CI](https://github.com/ckng0221/exam-app/actions/workflows/ui-ci.yml/badge.svg)](https://github.com/ckng0221/exam-app/actions/workflows/ui-ci.yml)

# Exam App

The `Exam App` is an Online Examination App. The Exam App allows users (admins) to create topics and questions, and publish the topics for users to perform attempt.

# Tech Stack

## Backend

- Programming Language: `Go`
- Web framework: `Gin`
- Object Relation Mapper(ORM): `Gorm`

## Frontend

- Web Framework: `Next.js`
- CSS framework: `Tailwind CSS`
- UI Library: `Material UI`

## Build

- Build tool: `Tuborepo`
- Multi-container tool: `Docker compose`

# Get started

Install dependencies

```bash
# JavaScript dependencies
# At the project root
$ npm install

# Go dependencies
$ go get github.com/githubnemo/CompileDaemon
$ go install github.com/githubnemo/CompileDaemon

# At ./apps/backend
$ go mod download
```

Run Application

```bash

# At the project root
# Development mode
npm run dev

# Build
npm run build

# Production mode
npm run start

```

# Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow the guidelines outlined in CONTRIBUTING.md.

# License

This project is licensed under the MIT License.
