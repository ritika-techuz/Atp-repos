import { describe, it, expect } from '@jest/globals';
import { jwtUtil } from '../jwt/index';

const { signJwt, validateJwt } = jwtUtil;

describe('jwt', () => {
    it('signs a token with given data', () => {
        const data = { foo: 'bar' };
        const token = signJwt(data);
        expect(token).not.toBeNull();
        const decoded = validateJwt(token as string);
        expect(decoded).toMatchObject({ data });
    });

    it('throws when given an invalid token', () => {
        expect(() => validateJwt('invalid token')).toThrowError(/(invalid signature|jwt malformed)/);
    });
});
