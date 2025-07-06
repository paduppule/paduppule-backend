# PadupPulse Backend API

A comprehensive menstrual hygiene and wellness education platform built with Node.js, Express, TypeScript, and MongoDB. This API provides menstrual health education, cycle tracking, user authentication, payment processing, and interactive learning features.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Health Educator, Wellness Seeker, Admin)
  - Secure password hashing with bcrypt

- **Menstrual Health Education**
  - Create, read, update menstrual hygiene courses
  - Course enrollment system for wellness programs
  - Free and paid menstrual health content support
  - Health topic categorization

- **Payment Integration**
  - Paystack payment gateway integration
  - Payment verification for premium menstrual health content
  - Automatic enrollment after successful payment

- **Interactive Learning System**
  - Dynamic menstrual health assessment quizzes
  - Wellness knowledge testing and scoring
  - Progress tracking for menstrual health goals
  - Wellness leaderboard functionality

- **Wellness Progress Tracking**
  - User menstrual health journey progress
  - Wellness course completion tracking
  - Health performance analytics

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
  "role": "wellness_seeker"
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

### Menstrual Health Course Endpoints

#### Get All Menstrual Health Courses
```http
GET /courses
```

#### Create Menstrual Health Course (Health Educator Only)
```http
POST /courses
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Menstrual Hygiene Basics",
  "description": "Essential guide to menstrual hygiene and wellness",
  "price": 5000,
  "isFree": false,
  "image": [file]
}
```

#### Enroll in Menstrual Health Course
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

### Menstrual Health Assessment Endpoints

#### Generate Menstrual Health Assessment
```http
GET /quiz/generate
Authorization: Bearer <token>
```

#### Submit Menstrual Health Assessment
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
   - Register a health educator and wellness seeker
   - Login to get JWT tokens

2. **Menstrual Health Course Management**
   - Create menstrual hygiene courses (health educator)
   - List all menstrual health courses
   - Enroll in wellness courses (wellness seeker)

3. **Payment Testing**
   - Initialize payment for premium menstrual health content
   - Use Paystack test cards
   - Verify payment completion

4. **Menstrual Health Assessment System**
   - Generate menstrual health assessments
   - Submit wellness knowledge answers
   - Check menstrual health journey progress

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

**Empowering young people to confidently navigate their menstrual health journey and unlock the keys to wellness.**

**Made with ❤️ by the PadupPulse Team**