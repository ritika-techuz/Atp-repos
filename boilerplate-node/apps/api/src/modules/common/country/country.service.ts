import { log } from '@repo/logger';
import { Country } from '@repo/db';
import { constants } from '@repo/config';
import { getRedisData, setRedisData } from '@repo/redis';
import { StatusCodes, ResponseMessages, CustomError } from '@repo/response-handler';
import { ICountryParams, ICountryQuery } from './helpers/country.types';

/**
 * @author Jitendra Singh
 * @description Fetches a country by its ID.
 */
const getCountryService = async (params: ICountryParams): Promise<Country> => {
    try {
        const { country_id } = params;
        const countryAttributes = ['id', 'name'];

        const country = await Country.query()
            .select(...countryAttributes)
            .findById(country_id);
        if (!country) throw new CustomError(ResponseMessages.COUNTRY.NOT_FOUND, StatusCodes.NOT_FOUND);

        return country;
    } catch (error) {
        log.error('getCountryService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Lists all countries.]
 */
const listCountriesService = async (query: ICountryQuery): Promise<Country[]> => {
    try {
        const { search } = query;
        const countryAttributes = ['id', 'name'];

        if (!search) {
            const data = await getRedisData(constants.redisKey.CountryList);
            if (data) return data;
        }

        const countryQuery = Country.query().select(...countryAttributes);
        if (search) countryQuery.where('name', 'like', `%${search}%`);
        const countries = await countryQuery;

        if (!search) await setRedisData(constants.redisKey.CountryList, countries);
        return countries;
    } catch (error) {
        log.error('listCountriesService Catch: ', error);
        throw error;
    }
};

export const countryService = {
    getCountryService,
    listCountriesService
};
