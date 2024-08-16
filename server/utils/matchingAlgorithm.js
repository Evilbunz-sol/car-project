// utils/matchingAlgorithm.js

function matchCars(userPreferences, carDatabase) {
  return carDatabase
    .map(car => ({
      car,
      score: calculateScore(userPreferences, car)
    }))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(result => result.car);
}

function calculateScore(preferences, car) {
  let score = 0;
  
  // Budget score (0-30 points)
  if (preferences.budget >= car.base_msrp) {
    score += 30;
  } else if (preferences.budget >= car.base_msrp * 0.9) {
    score += 20; // Within 10% of budget
  } else if (preferences.budget >= car.base_msrp * 0.8) {
    score += 10; // Within 20% of budget
  }

  // Body type score (0-20 points)
  if (preferences.bodyType === car.body_type) {
    score += 20;
  }

  // Make score (0-15 points)
  if (preferences.make === car.make) {
    score += 15;
  }

  // Model score (0-15 points)
  if (preferences.model === car.model) {
    score += 15;
  }

  // Year score (0-10 points)
  const yearDifference = Math.abs(preferences.year - car.year);
  if (yearDifference === 0) {
    score += 10;
  } else if (yearDifference <= 2) {
    score += 5;
  }

  // Trim score (0-5 points)
  if (preferences.trim && preferences.trim === car.trim) {
    score += 5;
  }

  // Additional feature matching (0-5 points)
  if (car.trim_description && car.trim_description.toLowerCase().includes(preferences.feature.toLowerCase())) {
    score += 5;
  }

  return score;
}

module.exports = matchCars;