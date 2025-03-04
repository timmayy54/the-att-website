# OAuth Implementation Guide for TheAttReviews

This guide provides step-by-step instructions for setting up the OAuth providers (Google and GitHub) for TheAttReviews website.

## Prerequisites

- A Next.js application with NextAuth.js installed
- Access to developer accounts for each provider
- A `.env.local` file for storing credentials

## 1. Google OAuth Setup (Updated for Latest UI)

### Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "OAuth consent screen"
4. Choose "External" user type and click "Create"
5. Fill in the required information:
   - App name: TheAttReviews
   - User support email: Your email
   - Developer contact information: Your email
6. Click "Save and Continue"

### Step 2: Configure Scopes

In the Google Cloud Console, you'll see three categories of scopes:
- **Non-sensitive scopes**: Basic profile information
- **Sensitive scopes**: Additional user data that requires verification
- **Restricted scopes**: Highly sensitive data that requires additional verification

For a basic authentication system, you only need to add these non-sensitive scopes:
- `openid`
- `.../auth/userinfo.email`
- `.../auth/userinfo.profile`

Select these scopes and click "Save and Continue".

### Step 3: Test Users (For Development)

While your app is in "Testing" status, only authorized test users can access it:
1. In the "Test users" section, click "Add users"
2. Add your email and any other test users' emails
3. Click "Save and Continue"

Note: You can skip adding test users during development if you're the only one testing the application.

### Step 4: Create OAuth Credentials

1. Navigate to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application" as the application type
4. Name: TheAttReviews Web Client
5. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `https://your-production-domain.com` (for production)
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://your-production-domain.com/api/auth/callback/google` (for production)
7. Click "Create"
8. Note the Client ID and Client Secret

### Step 5: Add Credentials to Environment Variables

Add the following to your `.env.local` file:

```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

### Step 6: Testing Google OAuth

To test your Google OAuth implementation:
1. Start your development server (`npm run dev`)
2. Navigate to your login page
3. Click the "Sign in with Google" button
4. You should be redirected to Google's consent screen
5. After granting permission, you should be redirected back to your application and logged in

If you encounter a "This app isn't verified" screen, you can proceed by clicking "Advanced" and then "Go to [Your App Name] (unsafe)". This is normal during development.

## 2. GitHub OAuth Setup with Environment-Specific Configurations

### Step 1: Create GitHub OAuth Applications (One for Local, One for Production)

#### Local Development Application:
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click on "OAuth Apps" and then "New OAuth App"
3. Fill in the required information:
   - Application name: TheAttReviews (Local)
   - Homepage URL: `http://localhost:3000`
   - Application description: TV show reviews website (Local Development)
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Note the Client ID
6. Generate a new client secret and note it down

#### Production Application:
1. Create another OAuth App in GitHub Developer Settings
2. Fill in the required information:
   - Application name: TheAttReviews (Production)
   - Homepage URL: `https://your-production-domain.com`
   - Application description: TV show reviews website
   - Authorization callback URL: `https://your-production-domain.com/api/auth/callback/github`
3. Click "Register application"
4. Note the Client ID
5. Generate a new client secret and note it down

### Step 2: Add Environment-Specific Credentials to Environment Variables

Add the following to your `.env.local` file:

```
# GitHub credentials for local development
GITHUB_CLIENT_ID_LOCAL=your-local-client-id
GITHUB_CLIENT_SECRET_LOCAL=your-local-client-secret

# GitHub credentials for production
GITHUB_CLIENT_ID_PROD=your-production-client-id
GITHUB_CLIENT_SECRET_PROD=your-production-client-secret
```

### Step 3: Update NextAuth Configuration for Environment Detection

Update your NextAuth configuration in `app/api/auth/[...nextauth]/route.ts` to use the appropriate credentials based on the environment:

```typescript
// Determine if we're in production or development
const isProduction = process.env.NODE_ENV === 'production';

const handler = NextAuth({
  providers: [
    // ... other providers
    GithubProvider({
      clientId: isProduction 
        ? (process.env.GITHUB_CLIENT_ID_PROD || "") 
        : (process.env.GITHUB_CLIENT_ID_LOCAL || ""),
      clientSecret: isProduction 
        ? (process.env.GITHUB_CLIENT_SECRET_PROD || "") 
        : (process.env.GITHUB_CLIENT_SECRET_LOCAL || ""),
    }),
    // ... other providers
  ],
  // ... rest of configuration
});
```

### Step 4: Testing GitHub OAuth

To test your GitHub OAuth implementation:
1. Start your development server (`npm run dev`)
2. Navigate to your login page
3. Click the "Sign in with GitHub" button
4. You should be redirected to GitHub's authorization page
5. After granting permission, you should be redirected back to your application and logged in

The system will automatically use your local credentials during development and production credentials when deployed.

## 4. Testing OAuth Providers

### Step 1: Start the Development Server

```bash
npm run dev
```

### Step 2: Test Each Provider

1. Navigate to `http://localhost:3000/login`
2. Click on each OAuth provider button to test the authentication flow
3. Verify that you can successfully log in with each provider
4. Check that user information is correctly displayed in the UI after login

### Step 3: Debugging Common Issues

If you encounter issues:

1. **Redirect URI Mismatch**: Ensure the callback URLs in your provider settings exactly match the ones NextAuth.js is using
2. **Missing Scopes**: Make sure you've requested the necessary scopes for each provider
3. **Environment Variables**: Verify that your `.env.local` file contains the correct credentials
4. **CORS Issues**: Check for any CORS-related errors in the browser console
5. **NextAuth.js Configuration**: Ensure your NextAuth.js configuration is correct

## 5. Production Deployment Considerations

Before deploying to production:

1. Update all OAuth provider settings with your production URLs
2. Set the `NEXTAUTH_URL` environment variable to your production URL
3. Generate a strong `NEXTAUTH_SECRET` for production
4. Consider using a database adapter for NextAuth.js to persist user sessions and accounts

## Conclusion

You should now have a fully functional authentication system with multiple OAuth providers. Users can sign in using their Google and GitHub accounts, as well as with email and password.

Remember to keep your client secrets secure and never commit them to your repository. 