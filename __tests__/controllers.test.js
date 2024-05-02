const express = require('express');
const searchController = require('../server/controllers/searchController.js');

// Mock the controller and provide a mock implementation for the function
jest.mock('../server/controllers/searchController.js', () => ({
  searchZipRecruiter: jest.fn(),
}));

const app = express();

app.post('/search', searchController.searchZipRecruiter);

test('If certain routes are calling the correct controller, controller should have been called times one.', async () => {
  await fetch('http://localhost:3000/search');
  expect(searchController.searchZipRecruiter).toHaveBeenCalledTimes(1);
});
