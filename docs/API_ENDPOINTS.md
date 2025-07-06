# API Endpoints Documentation

## Base URL
```
http://localhost:4000/api
```

## Authentication

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "trainee"
}
```

**Response:**
```json
{
  "message": "Register successful",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "trainee"
  },
  "token": "jwt_token_here"
}
```

### Login User
**POST** `/auth/login`

Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "trainee"
  },
  "token": "jwt_token_here"
}
```

## Courses

### Get All Courses
**GET** `/courses`

Retrieve all available courses.

**Response:**
```json
[
  {
    "_id": "course_id",
    "title": "JavaScript Fundamentals",
    "description": "Learn JavaScript basics",
    "price": 100,
    "isFree": false,
    "trainer": {
      "_id": "trainer_id",
      "name": "Trainer Name",
      "email": "trainer@example.com"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Create Course
**POST** `/courses`

Create a new course (Trainer only).

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (form-data):**
```
title: "Course Title"
description: "Course Description"
price: 100
isFree: false
image: [file] (optional)
```

**Response:**
```json
{
  "_id": "course_id",
  "title": "Course Title",
  "description": "Course Description",
  "price": 100,
  "isFree": false,
  "trainer": "trainer_id",
  "image": "filename.jpg",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Enroll in Course
**POST** `/courses/enroll`

Enroll user in a course.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "courseId": "course_id"
}
```

**Response:**
```json
{
  "message": "Enrolled",
  "enrollment": {
    "_id": "enrollment_id",
    "user": "user_id",
    "course": "course_id",
    "paid": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Payments

### Initialize Payment
**POST** `/payments/init`

Initialize payment for a course.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "courseId": "course_id",
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "authorization_url": "https://checkout.paystack.com/...",
  "reference": "REF123456789"
}
```

### Verify Payment
**POST** `/payments/verify`

Verify payment completion.

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "reference": "REF123456789"
}
```

**Response:**
```json
{
  "message": "Payment verified and access granted"
}
```

## Quiz System

### Generate Quiz
**GET** `/quiz/generate`

Generate a new quiz for the user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "quiz": {
    "_id": "quiz_id",
    "questions": [
      {
        "_id": "question_id",
        "question": "What is JavaScript?",
        "options": ["A programming language", "A database", "A framework"],
        "correctAnswer": "A programming language"
      }
    ]
  }
}
```

### Submit Quiz
**POST** `/quiz/submit`

Submit quiz answers and get results.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "answers": [
    {
      "questionId": "question_id",
      "selectedAnswer": "A programming language"
    }
  ]
}
```

**Response:**
```json
{
  "score": 80,
  "totalQuestions": 5,
  "correctAnswers": 4,
  "message": "Quiz submitted successfully"
}
```

## Categories

### Get All Categories
**GET** `/category`

Retrieve all course categories.

**Response:**
```json
[
  {
    "_id": "category_id",
    "name": "Programming",
    "description": "Programming courses"
  }
]
```

### Create Category
**POST** `/category`

Create a new category (Admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Programming",
  "description": "Programming courses"
}
```

## Progress Tracking

### Get User Progress
**GET** `/users/progress`

Get user's learning progress and statistics.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "totalCourses": 5,
  "completedCourses": 2,
  "totalScore": 150,
  "quizzesTaken": 10,
  "averageScore": 75
}
```

## Leaderboard

### Get Leaderboard
**GET** `/leaderboards`

Get top performing users.

**Response:**
```json
[
  {
    "_id": "user_id",
    "name": "John Doe",
    "totalScore": 200,
    "quizzesTaken": 15
  }
]
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Not enrolled."
}
```

### 404 Not Found
```json
{
  "message": "Course not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## File Upload

For endpoints that accept file uploads, use `multipart/form-data` content type.

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting for production use.

## CORS

CORS is enabled for all origins in development. Configure appropriately for production. 