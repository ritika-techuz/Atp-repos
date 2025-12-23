import { appConfig } from './app';

const swaggerUsername = process.env.SWAGGER_USERNAME;
const swaggerPassword = process.env.SWAGGER_PASSWORD;
const swaggerBaseApiUrl = process.env.APP_BASE_URL + '' + process.env.SWAGGER_API_BASE_URL;

const swaggerJsDocOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: `${appConfig.appName} API's`,
            version: '1.0.0',
            description: `API documentation for the ${appConfig.appName} app`
        },
        servers: [
            {
                url: swaggerBaseApiUrl + 'common/',
                description: `${appConfig.nodeEnv} server`
            },
            {
                url: swaggerBaseApiUrl + 'user/',
                description: `${appConfig.nodeEnv} server`
            },
            {
                url: swaggerBaseApiUrl + 'admin/',
                description: `${appConfig.nodeEnv} server`
            }
        ],
        components: {
            securitySchemes: {
                basicAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                basicAuth: []
            }
        ]
    },
    apis: [] // Path to route-specific YAML files
};

const swaggerOptions = {
    // url: '/swagger.json',
    filter: true,
    supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
    // tagsSorter: 'alpha',
    // operationsSorter: 'alpha',
    tagsSorter: (a: string, b: string): number => {
        const order = [
            'Country',
            'State',
            'Auth',
            'Profile',
            'Promo Code',
            'Plan',
            'Subscription',
            'User Management',
            'Subscription',
            'Feedback',
            'Activity',
            'Notifications'
        ];

        const indexA = order.indexOf(a);
        const indexB = order.indexOf(b);

        if (indexA === -1 && indexB === -1) return a.localeCompare(b); // Sort alphabetically if both tags are unknown
        if (indexA === -1) return 1; // Tag A is unknown, place it after B
        if (indexB === -1) return -1; // Tag B is unknown, place it after A

        return indexA - indexB;
    }
    // docExpansion: 'none'
};

export const swaggerJsDocConfig = swaggerJsDocOptions;
export const swaggerOptionsConfig = swaggerOptions;
export const swaggerApiBaseUrl = swaggerBaseApiUrl;
export const swaggerBasicAuthConfig = {
    userName: swaggerUsername,
    password: swaggerPassword
};
