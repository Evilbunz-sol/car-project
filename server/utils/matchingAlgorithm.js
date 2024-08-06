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
    if (preferences.budget >= car.price) score += 10;
    if (preferences.carSize === car.carSize) score += 5;
    if (preferences.fuelType === car.fuelType) score += 5;
    if (preferences.make === car.make) score += 3;
    if (preferences.model === car.model) score += 3;
    // Add more scoring criteria as needed
    return score;
  }
  
  module.exports = matchCars;