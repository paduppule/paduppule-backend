# PadupPulse Backend API

A comprehensive learning management system backend built with Node.js, Express, TypeScript, and MongoDB. This API provides course management, user authentication, payment processing, and quiz functionality.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Trainer, Trainee, Admin)
  - Secure password hashing with bcrypt

- **Course Management**
  - Create, read, update courses
  - Course enrollment system
  - Free and paid course support
  - Course categorization

- **Payment Integration**
  - Paystack payment gateway integration
  - Payment verification
  - Automatic enrollment after successful payment

- **Quiz System**
  - Dynamic quiz generation
  - Quiz submission and scoring
  - Progress tracking
  - Leaderboard functionality

- **Progress Tracking**
  - User learning progress
  - Course completion tracking
  - Performance analytics

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Paystack API
- **File Upload**: Multer
- **Password Hashing**: bcrypt

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Paystack account (for payment testing)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/paduppulse_backend.git
   cd paduppulse_backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/padup_pulse
   JWT_SECRET=your_super_secret_jwt_key_here
   PAYSTACK_SECRET_KEY=sk_test_your_paystack_test_secret_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:4000`

## 📚 API Documentation

### Base URL
```
http://localhost:4000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "trainee"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Course Endpoints

#### Get All Courses
```http
GET /courses
```

#### Create Course (Trainer Only)
```http
POST /courses
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Course Title",
  "description": "Course Description",
  "price": 100,
  "isFree": false,
  "image": [file]
}
```

#### Enroll in Course
```http
POST /courses/enroll
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "course_id_here"
}
```

### Payment Endpoints

#### Initialize Payment
```http
POST /payments/init
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "course_id_here",
  "email": "user@example.com"
}
```

#### Verify Payment
```http
POST /payments/verify
Content-Type: application/json

{
  "reference": "payment_reference_here"
}
```

### Quiz Endpoints

#### Generate Quiz
```http
GET /quiz/generate
Authorization: Bearer <token>
```

#### Submit Quiz
```http
POST /quiz/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "answers": [
    {
      "questionId": "question_id",
      "selectedAnswer": "selected_answer"
    }
  ]
}
```

## 🧪 Testing

### Manual Testing with Postman

1. **Import the Postman Collection** (see `docs/postman-collection.json`)
2. **Set up environment variables** in Postman
3. **Test the API endpoints** following the flow below

### Testing Flow

1. **Authentication**
   - Register a trainer and trainee
   - Login to get JWT tokens

2. **Course Management**
   - Create courses (trainer)
   - List all courses
   - Enroll in courses (trainee)

3. **Payment Testing**
   - Initialize payment for paid courses
   - Use Paystack test cards
   - Verify payment completion

4. **Quiz System**
   - Generate quizzes
   - Submit answers
   - Check results

### Paystack Test Cards

| Card Number | Expected Result |
|-------------|----------------|
| 4084 0840 8408 4081 | Success |
| 4084 0840 8408 4082 | Failed |
| 4084 0840 8408 4083 | Insufficient Funds |

## 📁 Project Structure

```
src/
├── controllers/          # Route controllers
│   ├── auth.controller.ts
│   ├── course.controller.ts
│   ├── payment.controller.ts
│   └── quiz.controller.ts
├── middlewares/          # Custom middlewares
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── hasCourseAccess.middleware.ts
├── models/              # Database models
│   ├── Course.ts
│   ├── Enrollment.ts
│   ├── Question.ts
│   └── user.model.ts
├── routes/              # API routes
│   ├── auth.routes.ts
│   ├── course.routes.ts
│   ├── payment.routes.ts
│   └── index.ts
├── services/            # Business logic
├── utils/               # Utility functions
│   ├── fileUpload.ts
│   └── paystack.ts
├── types/               # TypeScript type definitions
├── app.ts              # Express app configuration
└── server.ts           # Server entry point
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 4000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `PAYSTACK_SECRET_KEY` | Paystack API secret key | Yes |

### Database Schema

#### User Model
```typescript
{
  name: string;
  email: string;
  password: string;
  role: "trainer" | "trainee" | "admin";
  totalScore?: number;
  quizzesTaken?: number;
}
```

#### Course Model
```typescript
{
  title: string;
  description: string;
  price: number;
  isFree: boolean;
  image?: string;
  trainer: ObjectId;
}
```

#### Enrollment Model
```typescript
{
  user: ObjectId;
  course: ObjectId;
  paid: boolean;
}
```

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Docker (Optional)
```bash
docker build -t paduppulse-backend .
docker run -p 4000:4000 paduppulse-backend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/paduppulse_backend/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔗 Links

- [Frontend Repository](https://github.com/yourusername/paduppulse_frontend)
- [API Documentation](https://your-docs-url.com)
- [Paystack Documentation](https://paystack.com/docs)

---

**Made with ❤️ by the PadupPulse Team**