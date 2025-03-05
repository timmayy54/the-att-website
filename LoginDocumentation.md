# TheAttReviews Authentication Documentation

## Overview

This document provides comprehensive documentation for the authentication system implemented in TheAttReviews website. The system supports multiple authentication methods and is designed to be extensible for future user-related features.

## Authentication Methods

TheAttReviews supports four authentication methods:

1. **Email/Password Authentication**
2. **Google OAuth Authentication**
3. **GitHub OAuth Authentication**
4. **X (Twitter) OAuth Authentication**

## Technical Implementation

### Authentication Framework

The authentication system is built using NextAuth.js, a complete authentication solution for Next.js applications. NextAuth.js provides a unified API for handling various authentication providers and session management.

### Directory Structure

```
app/
├── api/
│   └── auth/
│       ├── [...nextauth]/
│       │   └── route.ts       # NextAuth.js configuration
│       └── signup/
│           └── route.ts       # User registration API
├── login/
│   └── page.tsx               # Login page
└── signup/
    └── page.tsx               # Signup page
```

### Authentication Flow

#### Email/Password Authentication

1. **Registration Process**:
   - User navigates to `/signup`
   - User provides name, email, and password
   - Client-side validation ensures password strength and matching
   - Form submission sends data to `/api/auth/signup`
   - Server validates input and checks for existing users
   - Password is hashed using bcrypt before storage
   - User is redirected to login page on success

2. **Login Process**:
   - User navigates to `/login`
   - User enters email and password
   - Credentials are sent to NextAuth.js credentials provider
   - NextAuth.js verifies credentials against stored user data
   - On success, a session is created and user is redirected

#### OAuth Authentication (Google, GitHub, X)

1. **Login Process**:
   - User clicks on the respective OAuth provider button
   - User is redirected to the provider's authentication page
   - User grants permission to the application
   - Provider redirects back to the application with an authorization code
   - NextAuth.js exchanges the code for an access token
   - User profile information is retrieved from the provider
   - NextAuth.js creates or updates the user record and establishes a session

### Data Storage

#### User Data Structure

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password?: string;        // Only for email/password users
  image?: string;           // Profile image URL
  emailVerified?: Date;     // Timestamp of email verification
  accounts?: Account[];     // OAuth accounts linked to this user
  sessions?: Session[];     // Active sessions for this user
}

interface Account {
  userId: string;
  provider: string;         // "google", "github", "twitter", etc.
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
}

interface Session {
  userId: string;
  expires: Date;
  sessionToken: string;
}
```

#### Database Considerations

In the current implementation, user data is stored in memory for demonstration purposes. In a production environment, this would be replaced with a persistent database solution:

1. **Options**:
   - SQL databases (PostgreSQL, MySQL)
   - NoSQL databases (MongoDB)
   - Serverless databases (Supabase, Firebase)

2. **Adapter Pattern**:
   NextAuth.js uses adapters to connect to different database systems. The adapter handles all database operations related to users, accounts, sessions, etc.

### Security Considerations

1. **Password Security**:
   - Passwords are never stored in plain text
   - Bcrypt with a cost factor of 10 is used for hashing
   - Password validation ensures minimum length and complexity

2. **OAuth Security**:
   - Client IDs and secrets are stored as environment variables
   - HTTPS is used for all OAuth redirects
   - State parameters prevent CSRF attacks

3. **Session Security**:
   - JWT or database sessions can be configured
   - Session expiration is enforced
   - CSRF protection is built into NextAuth.js

4. **Data Protection**:
   - Sensitive user data is never exposed to the client
   - API routes validate authentication before providing access to protected resources

## User Experience

### Login Page

The login page (`/login`) provides:
- Email/password login form
- Social login buttons for Google, GitHub, and X
- Link to the signup page for new users
- Error handling for invalid credentials

### Signup Page

The signup page (`/signup`) provides:
- Registration form with name, email, and password fields
- Password confirmation to prevent typos
- Terms of service and privacy policy acceptance
- Client-side validation for immediate feedback
- Server-side validation for security

### User Profile Component

The `UserProfile` component:
- Shows login button for unauthenticated users
- Displays user name and profile picture for authenticated users
- Provides a dropdown menu with logout option
- Handles loading states gracefully

## Future Extensions

### User Profile Enhancements

1. **Profile Management**:
   - Allow users to update their profile information
   - Enable profile picture uploads or changes
   - Implement email verification

2. **Account Linking**:
   - Allow users to link multiple authentication methods to a single account
   - Implement account recovery options

### Content Personalization

1. **User Preferences**:
   - Store user preferences for content filtering
   - Implement theme preferences
   - Save language preferences

2. **User-Generated Content**:
   - Allow users to create watchlists of shows
   - Enable users to rate shows
   - Implement a commenting system for reviews

3. **Social Features**:
   - Follow other users
   - Share reviews on social media
   - Create user recommendations based on similar tastes

### Implementation Approach for Future Features

1. **Database Schema Extensions**:
   ```typescript
   interface UserPreferences {
     userId: string;
     theme: 'light' | 'dark' | 'system';
     contentFilters: string[];
     emailNotifications: boolean;
   }

   interface Watchlist {
     id: string;
     userId: string;
     name: string;
     shows: WatchlistItem[];
   }

   interface WatchlistItem {
     id: string;
     watchlistId: string;
     showId: string;
     addedAt: Date;
     status: 'want-to-watch' | 'watching' | 'completed' | 'dropped';
   }

   interface UserRating {
     userId: string;
     showId: string;
     rating: number;
     createdAt: Date;
     updatedAt: Date;
   }

   interface Comment {
     id: string;
     userId: string;
     reviewId: string;
     content: string;
     createdAt: Date;
     updatedAt: Date;
   }
   ```

2. **API Extensions**:
   - `/api/user/preferences` - Get/update user preferences
   - `/api/user/watchlist` - Manage user watchlists
   - `/api/shows/{id}/rate` - Rate a show
   - `/api/reviews/{id}/comments` - Get/post comments on reviews

3. **UI Components**:
   - User profile page with tabs for different sections
   - Watchlist management interface
   - Rating component with star/number selection
   - Comment section with threading support

## Conclusion

The authentication system implemented in TheAttReviews provides a solid foundation for user management. It supports multiple authentication methods and is designed with security and user experience in mind. The system is also extensible, allowing for future enhancements to support personalization, user-generated content, and social features.

By following the patterns established in this implementation, developers can easily add new features while maintaining a consistent and secure user experience. 