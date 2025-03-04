import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
// Temporarily commenting out Twitter provider
// import TwitterProvider from "next-auth/providers/twitter";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

// In a real application, this would be imported from a database module
// For now, we'll access the same in-memory array used in the signup API
// This is just for demonstration purposes
let users: { id: string; name: string; email: string; password: string }[] = [];

// Try to import users from the signup API
try {
  const signupModule = require("../signup/route");
  if (signupModule && signupModule.users) {
    users = signupModule.users;
  }
} catch (error) {
  console.warn("Could not import users from signup API, using empty array");
  // Add a test user for development
  users.push({
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "$2b$10$GQl8xK9hXwZfKgmSGj.fAOUVeuB4bXwVXIRqPG8Ugr9PUqz.gEKNS" // "password123"
  });
}

// Log environment information for debugging
console.log("NextAuth Environment:", {
  nodeEnv: process.env.NODE_ENV,
  googleClientIdSet: !!process.env.GOOGLE_CLIENT_ID,
  githubClientIdLocalSet: !!process.env.GITHUB_CLIENT_ID_LOCAL,
  nextAuthUrlSet: !!process.env.NEXTAUTH_URL,
  nextAuthSecretSet: !!process.env.NEXTAUTH_SECRET,
  usersCount: users.length
});

// Create the auth config
export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID_LOCAL,
      clientSecret: process.env.GITHUB_CLIENT_SECRET_LOCAL
    }),
    // Temporarily commenting out Twitter provider
    // TwitterProvider({
    //   clientId: process.env.TWITTER_CLIENT_ID || "",
    //   clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
    // }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        console.log("Attempting to authenticate:", credentials.email);
        console.log("Available users:", users.map(u => u.email));
        
        // Find user by email
        const user = users.find(user => user.email === credentials.email);
        if (!user) {
          console.log("User not found:", credentials.email);
          return null;
        }

        // Verify password
        try {
          const passwordMatch = await compare(credentials.password as string, user.password);
          if (!passwordMatch) {
            console.log("Password does not match");
            return null;
          }
          console.log("Authentication successful for:", user.email);
          
          // Return user without password
          return {
            id: user.id,
            name: user.name,
            email: user.email
          };
        } catch (error) {
          console.error("Password comparison error:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login/error", // Custom error page in the login directory
    newUser: "/signup", // New users will be directed here on first sign in
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  debug: true, // Enable debug mode to see more detailed error messages
};

// Create the handler
const handler = NextAuth(authConfig);

// Export the handler
export { handler as GET, handler as POST }; 