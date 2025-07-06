# Contributing to PadupPulse Backend

Thank you for your interest in contributing to PadupPulse Backend! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## Getting Started

### Prerequisites

- Node.js 14+ 
- MongoDB
- Git
- A code editor (VS Code recommended)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/yourusername/paduppulse_backend.git
   cd paduppulse_backend
   ```

3. Add the original repository as upstream:
   ```bash
   git remote add upstream https://github.com/original-owner/paduppulse_backend.git
   ```

## Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Configure your environment variables:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/padup_pulse_dev
JWT_SECRET=your_development_jwt_secret
PAYSTACK_SECRET_KEY=sk_test_your_paystack_test_key
```

### 3. Database Setup

Start MongoDB:
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:4000`

## Coding Standards

### TypeScript Guidelines

- Use TypeScript for all new code
- Define proper interfaces for all data structures
- Use strict type checking
- Avoid `any` type - use proper typing

### Code Style

- Use 2 spaces for indentation
- Use semicolons at the end of statements
- Use single quotes for strings
- Use camelCase for variables and functions
- Use PascalCase for classes and interfaces
- Use UPPER_SNAKE_CASE for constants

### File Naming

- Use kebab-case for file names
- Use descriptive names
- Group related files in directories

### Code Organization

```typescript
// 1. Imports (external libraries first, then internal)
import express from 'express';
import { Request, Response } from 'express';
import { User } from '../models/user.model';

// 2. Interface definitions
interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

// 3. Function/class definitions
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Implementation
  } catch (error) {
    // Error handling
  }
};
```

### Error Handling

- Always use try-catch blocks for async operations
- Return appropriate HTTP status codes
- Provide meaningful error messages
- Log errors for debugging

```typescript
export const someFunction = async (req: Request, res: Response): Promise<void> => {
  try {
    // Implementation
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Error in someFunction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
```

### Database Operations

- Use Mongoose models for database operations
- Implement proper validation
- Use transactions when needed
- Handle database errors gracefully

### API Design

- Follow RESTful conventions
- Use consistent URL patterns
- Return consistent response formats
- Implement proper HTTP status codes

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for all new features
- Test both success and error cases
- Use descriptive test names
- Mock external dependencies

Example test structure:

```typescript
describe('User Controller', () => {
  describe('POST /auth/register', () => {
    it('should register a new user successfully', async () => {
      // Test implementation
    });

    it('should return error for duplicate email', async () => {
      // Test implementation
    });
  });
});
```

### Test Coverage

- Aim for at least 80% code coverage
- Test all critical business logic
- Test error handling paths
- Test edge cases

## Pull Request Process

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Write your code following the coding standards
- Add tests for new functionality
- Update documentation if needed
- Ensure all tests pass

### 3. Commit Your Changes

Use conventional commit messages:

```bash
git commit -m "feat: add user authentication endpoint"
git commit -m "fix: resolve payment verification issue"
git commit -m "docs: update API documentation"
```

Commit types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 4. Push Your Changes

```bash
git push origin feature/your-feature-name
```

### 5. Create a Pull Request

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Fill out the PR template
5. Submit the PR

### 6. PR Review Process

- All PRs require at least one review
- Address review comments promptly
- Update the PR as needed
- Ensure CI/CD checks pass

### PR Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] Error handling implemented
```

## Issue Reporting

### Before Creating an Issue

1. Check existing issues to avoid duplicates
2. Search the documentation
3. Try to reproduce the issue

### Issue Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 10]
- Node.js version: [e.g., 16.14.0]
- MongoDB version: [e.g., 5.0.6]

## Additional Information
Screenshots, logs, etc.
```

## Feature Requests

### Feature Request Template

```markdown
## Feature Description
Clear description of the requested feature

## Use Case
Why this feature is needed

## Proposed Solution
How you think it should be implemented

## Alternatives Considered
Other approaches you've considered

## Additional Information
Any other relevant information
```

## Code Review Guidelines

### For Reviewers

- Be constructive and respectful
- Focus on code quality and functionality
- Check for security issues
- Ensure tests are adequate
- Verify documentation is updated

### For Authors

- Respond to review comments promptly
- Be open to feedback and suggestions
- Explain your reasoning when needed
- Make requested changes or explain why not

## Security

### Security Guidelines

- Never commit sensitive information (API keys, passwords)
- Use environment variables for configuration
- Validate all user inputs
- Implement proper authentication and authorization
- Follow OWASP security guidelines

### Reporting Security Issues

If you find a security vulnerability:

1. **DO NOT** create a public issue
2. Email the security team at security@paduppulse.com
3. Include detailed information about the vulnerability
4. Allow time for the team to respond

## Documentation

### Documentation Standards

- Keep documentation up to date
- Use clear and concise language
- Include code examples
- Update API documentation for new endpoints
- Add inline comments for complex logic

### Documentation Files

- `README.md`: Project overview and setup
- `docs/API_ENDPOINTS.md`: API documentation
- `docs/DEPLOYMENT.md`: Deployment guide
- `CONTRIBUTING.md`: This file

## Getting Help

### Resources

- [API Documentation](docs/API_ENDPOINTS.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Issues](https://github.com/yourusername/paduppulse_backend/issues)
- [Discussions](https://github.com/yourusername/paduppulse_backend/discussions)

### Contact

- Create an issue for bugs or feature requests
- Use discussions for questions and ideas
- Email the team for urgent matters

## Recognition

Contributors will be recognized in:

- The project README
- Release notes
- Contributor hall of fame

Thank you for contributing to PadupPulse Backend! 🚀 