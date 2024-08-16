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
              items: { type: 'string' }
            }
          }
        },
      }
    },
    paths: {
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
              description: 'The car ID'
            }
          ],
          responses: {
            200: {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Car' }
                }
              }
            },
            404: { description: 'Car not found' }
          }
        }
      },
      '/api/v1/recommend': {
        post: {
          summary: 'Get car recommendations',
          tags: ['Recommendations'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UserPreferences' }
              }
            }
          },
          responses: {
            200: {
              description: 'Successful response with car recommendations',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Car' }
                  }
                }
              }
            },
            400: { description: 'Bad request, invalid input' },
            500: { description: 'Server error' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js'], // paths to files containing annotations
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };