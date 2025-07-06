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

## Sections

### Get Course Sections
**GET** `/sections/course/:courseId`

Get all sections for a specific course.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
[
  {
    "_id": "section_id",
    "title": "Section Title",
    "description": "Section Description",
    "order": 1,
    "course": "course_id"
  }
]
```

### Create Section
**POST** `/sections`

Create a new section (Trainer only).

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Section Title",
  "description": "Section Description",
  "courseId": "course_id",
  "order": 1
}
```

### Update Section
**PUT** `/sections/:sectionId`

Update a section (Trainer only).

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Section Title",
  "description": "Updated Description",
  "order": 2
}
```

### Delete Section
**DELETE** `/sections/:sectionId`

Delete a section (Trainer only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

## Lessons

### Get Section Lessons
**GET** `/lessons/section/:sectionId`

Get all lessons for a specific section.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
[
  {
    "_id": "lesson_id",
    "title": "Lesson Title",
    "content": "Lesson content...",
    "order": 1,
    "section": "section_id",
    "attachments": ["file1.pdf", "file2.docx"]
  }
]
```

### Create Lesson
**POST** `/lessons`

Create a new lesson (Trainer only).

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (form-data):**
```
title: "Lesson Title"
content: "Lesson content..."
sectionId: "section_id"
order: 1
attachments: [files] (optional)
```

### Update Lesson
**PUT** `/lessons/:lessonId`

Update a lesson (Trainer only).

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (form-data):**
```
title: "Updated Lesson Title"
content: "Updated content..."
order: 2
attachments: [files] (optional)
```

### Delete Lesson
**DELETE** `/lessons/:lessonId`

Delete a lesson (Trainer only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

## Completions

### Mark Lesson Complete
**POST** `/completions`

Mark a lesson as completed.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "lessonId": "lesson_id"
}
```

**Response:**
```json
{
  "message": "Lesson marked as completed",
  "completion": {
    "_id": "completion_id",
    "user": "user_id",
    "lesson": "lesson_id",
    "completedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get User Completions
**GET** `/completions/user`

Get all completions for the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
[
  {
    "_id": "completion_id",
    "lesson": {
      "_id": "lesson_id",
      "title": "Lesson Title"
    },
    "completedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## Certificates

### Generate Certificate
**POST** `/certificates/generate`

Generate a certificate for course completion.

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
  "message": "Certificate generated successfully",
  "certificate": {
    "_id": "certificate_id",
    "certificateNumber": "CERT-2024-001",
    "user": "user_id",
    "course": "course_id",
    "instructor": "instructor_id",
    "issuedDate": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get User Certificates
**GET** `/certificates/user`

Get all certificates for the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
[
  {
    "_id": "certificate_id",
    "certificateNumber": "CERT-2024-001",
    "course": {
      "_id": "course_id",
      "title": "Course Title"
    },
    "instructor": {
      "_id": "instructor_id",
      "name": "Instructor Name"
    },
    "issuedDate": "2024-01-01T00:00:00.000Z"
  }
]
```

### Verify Certificate
**GET** `/certificates/verify/:certificateNumber`

Verify a certificate by its number.

**Response:**
```json
{
  "valid": true,
  "certificate": {
    "_id": "certificate_id",
    "certificateNumber": "CERT-2024-001",
    "user": {
      "_id": "user_id",
      "name": "User Name"
    },
    "course": {
      "_id": "course_id",
      "title": "Course Title"
    },
    "instructor": {
      "_id": "instructor_id",
      "name": "Instructor Name"
    },
    "issuedDate": "2024-01-01T00:00:00.000Z"
  }
}
```

## Instructor Dashboard

### Get Dashboard Overview
**GET** `/instructor/dashboard`

Get instructor dashboard statistics and overview.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "overview": {
    "totalCourses": 5,
    "totalEnrollments": 150,
    "paidEnrollments": 120,
    "totalRevenue": 12000,
    "conversionRate": 80
  },
  "courseStats": [
    {
      "courseId": "course_id",
      "courseTitle": "Course Title",
      "totalStudents": 30,
      "completionRate": 75.5
    }
  ],
  "recentActivity": {
    "enrollments": [
      {
        "_id": "enrollment_id",
        "user": {
          "_id": "user_id",
          "name": "User Name",
          "email": "user@example.com"
        },
        "course": {
          "_id": "course_id",
          "title": "Course Title"
        },
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "certificates": [
      {
        "_id": "certificate_id",
        "user": {
          "_id": "user_id",
          "name": "User Name",
          "email": "user@example.com"
        },
        "course": {
          "_id": "course_id",
          "title": "Course Title"
        },
        "issuedDate": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### Get Course Analytics
**GET** `/instructor/courses/:courseId/analytics`

Get detailed analytics for a specific course.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "courseInfo": {
    "title": "Course Title",
    "description": "Course Description",
    "price": 100,
    "isFree": false
  },
  "overview": {
    "totalEnrollments": 30,
    "paidEnrollments": 25,
    "totalLessons": 15,
    "totalSections": 5
  },
  "lessonStats": [
    {
      "lessonId": "lesson_id",
      "lessonTitle": "Lesson Title",
      "completions": 20,
      "completionRate": 66.67
    }
  ],
  "studentProgress": [
    {
      "userId": "user_id",
      "userName": "User Name",
      "userEmail": "user@example.com",
      "progress": 80.0,
      "completedLessons": 12,
      "totalLessons": 15,
      "isPaid": true
    }
  ],
  "monthlyEnrollments": [
    {
      "_id": {
        "year": 2024,
        "month": 1
      },
      "count": 10
    }
  ]
}
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

### JWT Token Authentication
Most protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

### API Key Authentication
Some endpoints support API key authentication for external integrations. Use either:

```
x-api-key: <your_api_key>
```

or

```
api-key: <your_api_key>
```

### Combined Authentication
The system supports both JWT tokens and API keys. You can use either method for most endpoints.

## API Key Management

### Generate API Key
**POST** `/admin/generate-api-key`

Generate a new API key for external integrations.

**Headers:**
```
x-api-key: <existing_api_key>
Content-Type: application/json
```

**Request Body (optional):**
```json
{
  "prefix": "custom_prefix"
}
```

**Response:**
```json
{
  "message": "API key generated successfully",
  "apiKey": "padup_a1b2c3d4e5f6...",
  "instructions": [
    "Add this API key to your .env file as API_KEY=your_generated_key",
    "Use this key in requests with header: x-api-key: your_generated_key",
    "Keep this key secure and don't share it publicly"
  ]
}
```

### Get System Information
**GET** `/admin/system-info`

Get system information and configuration status.

**Headers:**
```
x-api-key: <your_api_key>
```

**Response:**
```json
{
  "message": "System information retrieved",
  "systemInfo": {
    "nodeVersion": "v18.0.0",
    "platform": "win32",
    "uptime": 3600,
    "memoryUsage": {
      "rss": 12345678,
      "heapTotal": 9876543,
      "heapUsed": 5432109
    },
    "environment": "development",
    "apiKeyConfigured": true,
    "jwtConfigured": true,
    "paystackConfigured": true
  }
}
```

## File Upload

For endpoints that accept file uploads, use `multipart/form-data` content type.

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting for production use.

## CORS

CORS is enabled for all origins in development. Configure appropriately for production. 