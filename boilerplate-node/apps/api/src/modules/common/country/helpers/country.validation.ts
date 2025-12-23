import Joi from 'joi';

const getCountrySchema = {
    params: {
        country_id: Joi.number().required()
    }
};

export const countryValidation = {
    getCountrySchema
};
