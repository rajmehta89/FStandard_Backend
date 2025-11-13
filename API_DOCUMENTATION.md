# FSStandard Backend API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Contact Endpoint

### Create Contact Message
Submit a contact message. Requires authentication.

**Endpoint:** `POST /api/contact`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phoneNo": "1234567890",
  "message": "Hello, I need help with..."
}
```

**Validation Rules:**
- `name`: Required, string, 2-100 characters
- `email`: Required, string, valid email format
- `phoneNo`: Required, string, 10-20 characters
- `message`: Required, string, 10-1000 characters

**Success Response (201):**
```json
{
  "success": true,
  "message": "Contact message sent successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "user_id": "user-uuid-from-token",
    "name": "John Doe",
    "email": "john@example.com",
    "phone_no": "1234567890",
    "message": "Hello, I need help with...",
    "created_at": "2024-01-01T12:00:00.000Z"
  }
}
```

**Error Response - No Token (401):**
```json
{
  "error": "Unauthorized",
  "message": "No token provided"
}
```

**Error Response - Invalid/Expired Token (401):**
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

**Error Response - Validation Failed (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Name must be at least 2 characters long",
    "Email must be a valid email address"
  ]
}
```

## Health Check Endpoint

### Get Health Status
Check the health status of the API server.

**Endpoint:** `GET /api/health`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Health check successful",
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "uptime": 3600.5,
    "environment": "development",
    "version": "1.0.0"
  }
}
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Additional error details"] // Optional
}
```

## Environment Variables

Make sure to set the following environment variables in your `.env` file:

```env
PORT=3000
NODE_ENV=development
APP_URL=http://localhost:3000
CORS_ORIGIN=*
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Supabase Table Schema

Create a `contacts` table in Supabase with the following schema:

```sql
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_no VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to insert their own contacts
CREATE POLICY "Users can insert their own contacts"
  ON contacts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to view their own contacts
CREATE POLICY "Users can view their own contacts"
  ON contacts FOR SELECT
  USING (auth.uid() = user_id);
```

## Notes

- All protected endpoints require a valid JWT token in the Authorization header
- The token is verified using Supabase Auth
- User ID is automatically extracted from the token and added to the contact record
- All passwords are securely hashed by Supabase
- The API uses anon key for token verification (client-side operations)

