import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';

type SchemaGroup = {
    params?: Record<string, Joi.Schema>;
    query?: Record<string, Joi.Schema>;
    body?: Record<string, Joi.Schema>;
    headers?: Record<string, Joi.Schema>;
};

/**
 * @description Creates a middleware function that validates the request against the provided schemas.
 * @param schemas - The object containing the schemas to validate against.
 * @returns A middleware function that validates the request.
 */
export const validateRequest = (schemas: SchemaGroup): any => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            for (const key of Object.keys(schemas) as (keyof SchemaGroup)[]) {
                const rawSchema = schemas[key];
                const schema: ObjectSchema | undefined = rawSchema ? Joi.object(rawSchema) : undefined;
                const value = req[key as keyof Request];

                if (schema) await schema.validateAsync(value, { abortEarly: false });
            }

            next();
        } catch (err: any) {
            return sendResponse(
                res,
                StatusCodes.BAD_REQUEST,
                err.details?.map((d: any) => d.message)?.[0] || ResponseMessages.COMMON.VALIDATION_ERROR,
                err.details?.map((d: any) => d.message) || ['Invalid input']
            );
        }
    };
};
