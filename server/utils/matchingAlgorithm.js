// matchingalgorithm.js
const fuzzysort = require('fuzzysort');

// Fuzzy logic functions
const fuzzyMatch = (search, target) => {
  if (!search || !target) return 0;
  const result = fuzzysort.single(search, target);
  if (!result) return 0;
  const maxScore = 0; // Exact match score
  const minScore = -100; // Worst possible score
  const normalizedScore = (result.score - minScore) / (maxScore - minScore);
  return normalizedScore;
};

const fuzzyRange = (value, min, max) => {
  if (typeof min === 'undefined' && typeof max === 'undefined') return 1;
  if (typeof min === 'undefined') min = value;
  if (typeof max === 'undefined') max = value;
  if (min > max) [min, max] = [max, min];
  if (value >= min && value <= max) return 1;
  const range = max - min || 1; // Prevent division by zero
  const distance = Math.min(Math.abs(value - min), Math.abs(value - max));
  return Math.max(1 - distance / range, 0);
};

// MCDM weights
const weights = {
  price: 0.4,
  bodyType: 0.3,
  year: 0.2,
  make: 0.1,
};

const calculateScore = (car, preferences) => {
  let score = 0;
  let totalWeight = 0;

  // Price score
  if (
    typeof car.base_msrp !== 'undefined' &&
    (typeof preferences.minPrice !== 'undefined' ||
      typeof preferences.maxPrice !== 'undefined')
  ) {
    const priceScore = fuzzyRange(
      car.base_msrp,
      preferences.minPrice,
      preferences.maxPrice
    );
    score += weights.price * priceScore;
    totalWeight += weights.price;
  }

  // Body type score
  if (preferences.bodyType) {
    const bodyTypeScore = fuzzyMatch(preferences.bodyType, car.body_type);
    score += weights.bodyType * bodyTypeScore;
    totalWeight += weights.bodyType;
  }

  // Year score
  if (
    typeof car.year !== 'undefined' &&
    (typeof preferences.minYear !== 'undefined' ||
      typeof preferences.maxYear !== 'undefined')
  ) {
    const yearScore = fuzzyRange(
      car.year,
      preferences.minYear,
      preferences.maxYear
    );
    score += weights.year * yearScore;
    totalWeight += weights.year;
  }

  // Make score
  if (preferences.make) {
    const makeScore = fuzzyMatch(preferences.make, car.make);
    score += weights.make * makeScore;
    totalWeight += weights.make;
  }

  if (totalWeight > 0) {
    return score / totalWeight;
  } else {
    return 0;
  }
};

const matchCars = (preferences, carDatabase) => {
  // Filter cars based on hard constraints
  const filteredCars = carDatabase.filter((car) => {
    // Price filter
    if (
      (typeof preferences.minPrice !== 'undefined' && car.base_msrp < preferences.minPrice) ||
      (typeof preferences.maxPrice !== 'undefined' && car.base_msrp > preferences.maxPrice)
    ) {
      return false; // Exclude car
    }

    // Body type filter (if you want to enforce it strictly)
    if (preferences.bodyType && car.body_type.toLowerCase() !== preferences.bodyType.toLowerCase()) {
      return false; // Exclude car
    }

    // Year filter (if specified)
    if (
      (typeof preferences.minYear !== 'undefined' && car.year < preferences.minYear) ||
      (typeof preferences.maxYear !== 'undefined' && car.year > preferences.maxYear)
    ) {
      return false; // Exclude car
    }

    return true; // Include car
  });

  // Proceed with scoring
  const scoredCars = filteredCars
    .map((car) => ({
      car,
      score: calculateScore(car, preferences),
    }))
    .filter((result) => result.score > 0);

  // ... [Existing grouping and sorting logic] ...

  // Create a Map to store the highest-scoring car for each make and model
  const carMap = new Map();

  for (const { car, score } of scoredCars) {
    const modelKey = `${car.make}-${car.model}`;
    if (!carMap.has(modelKey) || carMap.get(modelKey).score < score) {
      carMap.set(modelKey, { car, score });
    }
  }

  // Convert the Map to an array and sort by score
  const uniqueScoredCars = Array.from(carMap.values()).sort((a, b) => b.score - a.score);

  // Get the top 5 unique cars
  const recommendations = uniqueScoredCars.slice(0, 5).map((item) => item.car);

  return recommendations;
};

module.exports = matchCars
