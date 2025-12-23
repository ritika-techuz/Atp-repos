import Joi from 'joi';
import { describe, it, expect, jest } from '@jest/globals';
import { validateRequest } from '../index';

describe('validateRequest middleware', () => {
    const schema = {
        body: {
            name: Joi.string().required()
        }
    };

    const middleware = validateRequest(schema);

    it('should call next() when validation passes', async () => {
        const req: any = {
            body: {
                name: 'John'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        const next = jest.fn();

        await middleware(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 400 when validation fails', async () => {
        const req: any = {
            body: {} // Missing 'name'
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        const next = jest.fn();

        await middleware(req, res, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        // expect(res.json).toHaveBeenCalledWith(
        //   expect.objectContaining({
        //     success: false,
        //     statusCode: 400,
        //     // message: 'Validation Error',
        //     errors: expect.any(Array),
        //   })
        // );
    });
});
