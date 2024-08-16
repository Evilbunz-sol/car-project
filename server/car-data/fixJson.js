const fs = require('fs');

function fixJson(inputFile, outputFile) {
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    
    try {
      const jsonData = JSON.parse(data);
      
      jsonData.forEach(car => {
        // Convert string representation of array to actual array
        car.image_urls = JSON.parse(car.image_urls.replace(/'/g, '"'));
        // Remove empty strings from the array
        car.image_urls = car.image_urls.filter(url => url !== '');
      });
      
      fs.writeFile(outputFile, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log("JSON file has been fixed and saved as", outputFile);
      });
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
    }
  });
}

// Usage
fixJson('cars.json', 'cars_fixed.json');