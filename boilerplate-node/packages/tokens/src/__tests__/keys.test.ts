import path from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { describe, it, expect } from '@jest/globals';

const privateKeyPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../keys/private.key');
const publicKeyPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../keys/public.pub');

describe('generateKeys', () => {
    it('should generate keys successfully', () => {
        expect(existsSync(privateKeyPath)).toBeTruthy();
        expect(existsSync(publicKeyPath)).toBeTruthy();
    });
});
