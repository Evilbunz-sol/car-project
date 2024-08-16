const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = "https://sqabpinhmegznezevest.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxYWJwaW5obWVnem5lemV2ZXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM0MzA5ODUsImV4cCI6MjAzOTAwNjk4NX0.LTLmSo6fKBY6whCbv_DCQfX7rwKHLSk3urDUDup_UoE"
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('Testing connection to Supabase...');
    const { data, error } = await supabase.from('cars').select('*').limit(1);
    
    if (error) {
      throw new Error('Connection test failed: ' + error.message);
    }
    
    console.log('Connection test successful. Response:', data);
  } catch (err) {
    console.error('Error testing connection:', err);
  }
}

async function importCars() {
  try {
    // Read the JSON file
    const carsData = JSON.parse(fs.readFileSync('Cars.json', 'utf8'));
    
    console.log('Starting data insertion...');
    
    // Insert data into Supabase
    const { data, error } = await supabase
      .from('cars')
      .insert(carsData);

    if (error) {
      throw new Error('Data insertion failed: ' + error.message);
    }

    if (data && data.length) {
      console.log(`Successfully inserted ${data.length} cars.`);
    } else {
      console.log('No data was returned. Check if the insertion was successful.');
    }
  } catch (err) {
    console.error('Error inserting data:', err);
  }
}

// Run the connection test and data import
(async () => {
  await testConnection();
  await importCars();
})();
