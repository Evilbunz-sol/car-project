// swaggerDocs.js

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Car Recommendation API',
      version: '1.0.0',
      description: 'API for car recommendations',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./swaggerDocs.js'], // Point to this file
};

const specs = swaggerJsdoc(options);

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       properties:
 *         make:
 *           type: string
 *         model:
 *           type: string
 *         year:
 *           type: number
 *         price:
 *           type: number
 *         fuelType:
 *           type: string
 *         carSize:
 *           type: string
 *         imageURL:
 *           type: string
 *         engineType:
 *           type: string
 *         transmission:
 *           type: string
 *         seatingCapacity:
 *           type: number
 *         mpg:
 *           type: string
 *         safetyRating:
 *           type: string
 *         techFeatures:
 *           type: array
 *           items:
 *             type: string
 *         primaryUse:
 *           type: string
 *         drivingEnvironment:
 *           type: string
 *         mustHaveFeature:
 *           type: string
 *         additionalConsideration:
 *           type: string
 *         externalLinks:
 *           type: array
 *           items:
 *             type: string
 *         styleRating:
 *           type: number
 *         luxuryRating:
 *           type: number
 *         performanceRating:
 *           type: number
 *         maintenanceCost:
 *           type: string
 *         resaleValueRating:
 *           type: number
 * 
 * /api/v1/cars/{id}:
 *   get:
 *     summary: Get a specific car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The car ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 * 
 * /api/v1/cars/options:
 *   get:
 *     summary: Get all available options for car attributes
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 carSizes:
 *                   type: array
 *                   items:
 *                     type: string
 *                 fuelTypes:
 *                   type: array
 *                   items:
 *                     type: string
 *                 makes:
 *                   type: array
 *                   items:
 *                     type: string
 *                 models:
 *                   type: array
 *                   items:
 *                     type: string
 * 
 * /api/v1/recommend:
 *   post:
 *     summary: Get car recommendations
 *     tags: [Recommendations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               budget:
 *                 type: number
 *                 description: Maximum budget for the car
 *               carSize:
 *                 type: string
 *                 enum: [Compact, Midsize, Full-size, SUV, Truck]
 *                 description: Preferred size of the car
 *               fuelType:
 *                 type: string
 *                 enum: [Gasoline, Diesel, Electric, Hybrid]
 *                 description: Preferred fuel type
 *               primaryUse:
 *                 type: string
 *                 description: Primary use of the car
 *               mustHaveFeature:
 *                 type: string
 *                 description: Must-have feature for the car
 *     responses:
 *       200:
 *         description: Successful response with car recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Server error
 */

module.exports = { swaggerUi, specs };