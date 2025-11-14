import { describe, it, expect, beforeEach } from '@jest/globals';
import { hashPassword, comparePassword } from '@/lib/auth-utils';

describe('Authentication', () => {
  describe('Password Hashing', () => {
    it('should hash and verify passwords correctly', async () => {
      const password = 'testPassword123';
      const hashed = await hashPassword(password);
      
      expect(hashed).not.toBe(password);
      expect(await comparePassword(password, hashed)).toBe(true);
      expect(await comparePassword('wrongPassword', hashed)).toBe(false);
    });
  });

  describe('JWT Tokens', () => {
    it('should generate and verify tokens', () => {
      const payload = { userId: '123', email: 'test@example.com', role: 'member' };
      const token = generateToken(payload);
      const decoded = verifyToken(token);
      
      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.email).toBe(payload.email);
      expect(decoded.role).toBe(payload.role);
    });
  });
});