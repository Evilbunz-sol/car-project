// swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Car Recommendation API',
      version: '1.0.0',
      description: 'API for car recommendations and details',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      // You can add your production server here
      // {
      //   url: 'https://your-production-url.com',
      //   description: 'Production server',
      // },
    ],
    components: {
      schemas: {
        Car: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            make: { type: 'string' },
            model: { type: 'string' },
            year: { type: 'integer' },
            trim: { type: 'string' },
            trim_description: { type: 'string' },
            base_msrp: { type: 'number' },
            body_type: { type: 'string' },
            image_urls: {
              type: 'array',
              items: { type: 'string' },
            },
          },
          required: ['id', 'make', 'model', 'year', 'base_msrp', 'body_type'],
        },
        Preferences: {
          type: 'object',
          properties: {
            minPrice: {
              type: 'number',
              description: 'Minimum price of the car',
            },
            maxPrice: {
              type: 'number',
              description: 'Maximum price of the car',
            },
            bodyType: {
              type: 'string',
              description: 'Type of the car body',
            },
            features: {
              type: 'array',
              items: { type: 'string' },
              description: 'List of desired features',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            msg: { type: 'string' },
            error: { type: 'string' },
          },
        },
      },
    },
    paths: {
      '/api/v1/cars': {
        get: {
          summary: 'Get all cars',
          tags: ['Cars'],
          responses: {
            '200': {
              description: 'Successful response with a list of cars',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      cars: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Car' },
                      },
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/cars/{id}': {
        get: {
          summary: 'Get a specific car by ID',
          tags: ['Cars'],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'The car ID',
            },
          ],
          responses: {
            '200': {
              description: 'Successful response with car details',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      car: { $ref: '#/components/schemas/Car' },
                    },
                  },
                },
              },
            },
            '404': {
              description: 'Car not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
            '500': {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/recommend': {
        post: {
          summary: 'Get car recommendations based on user input',
          tags: ['Recommendations'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    userInput: {
                      type: 'string',
                      description:
                        'User input describing their car preferences',
                    },
                  },
                  required: ['userInput'],
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Successful response with car recommendations',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      recommendations: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Car' },
                      },
                      count: {
                        type: 'integer',
                        description: 'Number of recommendations returned',
                      },
                      preferences: {
                        $ref: '#/components/schemas/Preferences',
                      },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Bad request, invalid input',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
            '500': {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [], // You can remove this if you're defining everything in the 'definition' section
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
