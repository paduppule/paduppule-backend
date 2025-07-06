# Deployment Guide

This guide covers deploying the PadupPulse Backend API to various environments.

## Prerequisites

- Node.js 14+ installed
- MongoDB database (local or cloud)
- Paystack account for payment processing
- Git repository access

## Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=4000
NODE_ENV=production

# Database Configuration
MONGODB_URI=mongodb://your-mongodb-connection-string

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key

# Paystack Configuration
PAYSTACK_SECRET_KEY=sk_live_your_paystack_live_secret_key

# Optional: Redis for caching (if implemented)
REDIS_URL=redis://your-redis-url

# Optional: File storage (AWS S3, etc.)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=your-aws-region
AWS_S3_BUCKET=your-s3-bucket-name
```

## Local Development Deployment

### 1. Clone and Setup

```bash
git clone https://github.com/yourusername/paduppulse_backend.git
cd paduppulse_backend
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Database Setup

```bash
# Start MongoDB (if local)
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env
```

### 4. Start Development Server

```bash
npm run dev
```

## Production Deployment

### Option 1: Traditional Server (Ubuntu/Debian)

#### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install MongoDB
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### 2. Application Deployment

```bash
# Clone repository
git clone https://github.com/yourusername/paduppulse_backend.git
cd paduppulse_backend

# Install dependencies
npm install

# Build TypeScript
npm run build

# Setup environment
cp .env.example .env
# Edit .env with production values

# Start with PM2
pm2 start dist/server.js --name "paduppulse-backend"
pm2 startup
pm2 save
```

#### 3. Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 2: Docker Deployment

#### 1. Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 4000

CMD ["node", "dist/server.js"]
```

#### 2. Create docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/padup_pulse
      - JWT_SECRET=${JWT_SECRET}
      - PAYSTACK_SECRET_KEY=${PAYSTACK_SECRET_KEY}
    depends_on:
      - mongo
    volumes:
      - ./uploads:/app/uploads

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

#### 3. Deploy with Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f app
```

### Option 3: Cloud Platform Deployment

#### Heroku

1. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

2. **Add MongoDB Addon**
   ```bash
   heroku addons:create mongolab:sandbox
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set JWT_SECRET=your-jwt-secret
   heroku config:set PAYSTACK_SECRET_KEY=your-paystack-key
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

#### Railway

1. **Connect Repository**
   - Connect your GitHub repository to Railway
   - Railway will auto-detect Node.js

2. **Set Environment Variables**
   - Add all required environment variables in Railway dashboard

3. **Deploy**
   - Railway will automatically deploy on push to main branch

#### Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   - Add environment variables in Vercel dashboard

## SSL/HTTPS Setup

### Let's Encrypt (Nginx)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Cloudflare

1. Add your domain to Cloudflare
2. Update nameservers
3. Enable SSL/TLS encryption mode to "Full"
4. Enable "Always Use HTTPS"

## Monitoring and Logging

### PM2 Monitoring

```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs

# Restart application
pm2 restart paduppulse-backend
```

### Application Logging

Add logging to your application:

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

## Backup Strategy

### Database Backup

```bash
# MongoDB backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="your-mongodb-uri" --out="/backup/mongo_$DATE"
```

### File Uploads Backup

```bash
# Backup uploads directory
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz uploads/
```

## Security Considerations

### 1. Environment Variables
- Never commit `.env` files to version control
- Use strong, unique secrets
- Rotate secrets regularly

### 2. Database Security
- Use strong database passwords
- Enable MongoDB authentication
- Restrict database access to application server

### 3. API Security
- Implement rate limiting
- Add request validation
- Use HTTPS in production
- Implement CORS properly

### 4. File Upload Security
- Validate file types and sizes
- Scan uploaded files for malware
- Store files in secure location

## Performance Optimization

### 1. Database Optimization
- Add indexes to frequently queried fields
- Use database connection pooling
- Implement caching (Redis)

### 2. Application Optimization
- Enable compression
- Implement response caching
- Optimize images and static files

### 3. Monitoring
- Set up application performance monitoring
- Monitor database performance
- Set up alerts for errors and downtime

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   lsof -i :4000
   kill -9 <PID>
   ```

2. **MongoDB Connection Issues**
   ```bash
   # Check MongoDB status
   sudo systemctl status mongodb
   
   # Restart MongoDB
   sudo systemctl restart mongodb
   ```

3. **Permission Issues**
   ```bash
   # Fix uploads directory permissions
   sudo chown -R $USER:$USER uploads/
   chmod 755 uploads/
   ```

### Log Analysis

```bash
# View application logs
tail -f logs/app.log

# View error logs
tail -f logs/error.log

# Search for specific errors
grep "ERROR" logs/app.log
```

## Support

For deployment issues:
1. Check the logs for error messages
2. Verify environment variables are set correctly
3. Ensure all dependencies are installed
4. Check network connectivity and firewall settings

Contact the development team for additional support. 