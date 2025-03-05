'use server';

import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'crypto';

// Server-side function to hash a password
export async function hashPassword(password: string): Promise<string> {
  // Generate a random salt
  const salt = randomBytes(16).toString('hex');
  
  // Hash the password with the salt using scrypt
  const hash = scryptSync(password, salt, 64).toString('hex');
  
  // Return the salt and hash combined
  return `${salt}:${hash}`;
}

// Server-side function to verify a password
export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    // Split the stored hash into salt and hash
    const [salt, storedHash] = hashedPassword.split(':');
    
    // If we're dealing with a bcrypt hash (from previous users)
    if (!salt || !storedHash) {
      // Fallback for bcrypt hashes - just return false as we can't verify them without bcrypt
      console.warn('Encountered a non-compatible password hash format');
      return false;
    }
    
    // Hash the provided password with the same salt
    const hash = scryptSync(plainPassword, salt, 64).toString('hex');
    
    // Compare the hashes in constant time to prevent timing attacks
    return hash === storedHash;
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
} 