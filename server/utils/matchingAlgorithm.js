// utils/matchingAlgorithm.js

function matchCars(userPreferences, carDatabase) {
  const scoredCars = carDatabase
    .map(car => ({
      car,
      score: calculateScore(userPreferences, car)
    }))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score);

  return diversifyResults(scoredCars, 5);
}

function calculateScore(preferences, car) {
  let score = 0;
  const budget = parseInt(preferences.budget);

  // Budget score (0-50 points)
  if (budget >= car.base_msrp) {
    score += 50;
  } else if (budget * 1.1 >= car.base_msrp) {
    score += 25;
  }

  // Body type score (0-50 points)
  if (preferences.body_type === car.body_type) {
    score += 50;
  } else {
    const similarityScore = getBodyTypeSimilarityScore(preferences.body_type, car.body_type);
    score += similarityScore;
  }

  // Value for money score (0-20 points)
  const valueScore = Math.min(20, Math.round((budget - car.base_msrp) / 1000));
  score += Math.max(0, valueScore);

  // Popularity score based on body type trend (0-10 points)
  score += getPopularityScore(car.body_type);

  return score;
}

function getBodyTypeSimilarityScore(preferredType, carType) {
  const similarityMap = {
    'SUV': { 'Crossover': 30, 'Wagon': 20, 'Truck': 15 },
    'Sedan': { 'Coupe': 25, 'Hatchback': 20 },
    'Coupe': { 'Sedan': 25, 'Convertible': 20 },
    'Hatchback': { 'Sedan': 20, 'Wagon': 15 },
    'Convertible': { 'Coupe': 20, 'Roadster': 15 },
    'Truck': { 'SUV': 15, 'Van': 10 },
    'Wagon': { 'SUV': 20, 'Hatchback': 15 }
  };

  return similarityMap[preferredType]?.[carType] || 0;
}

function getPopularityScore(bodyType) {
  const popularityMap = {
    'SUV': 10,
    'Sedan': 8,
    'Truck': 7,
    'Crossover': 9,
    'Hatchback': 6,
    'Coupe': 5,
    'Convertible': 4,
    'Wagon': 3,
    'Van': 2
  };

  return popularityMap[bodyType] || 0;
}

function diversifyResults(scoredCars, limit) {
  const diverseResults = [];
  const seenModels = new Set();

  for (const { car } of scoredCars) {
    const modelKey = `${car.make}-${car.model}`;
    if (!seenModels.has(modelKey)) {
      diverseResults.push(car);
      seenModels.add(modelKey);
    }

    if (diverseResults.length >= limit) break;
  }

  // If we don't have enough diverse results, fill with best scoring cars
  while (diverseResults.length < limit && scoredCars.length > diverseResults.length) {
    const nextCar = scoredCars[diverseResults.length].car;
    if (!diverseResults.includes(nextCar)) {
      diverseResults.push(nextCar);
    }
  }

  return diverseResults;
}

module.exports = matchCars;