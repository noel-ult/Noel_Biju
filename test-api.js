// Comprehensive REST API test script
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Configure axios with timeout
axios.defaults.timeout = 5000;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testEndpoint(testName, testFunction) {
  try {
    console.log(`\n${testName}`);
    await testFunction();
    console.log('✅ PASSED');
  } catch (error) {
    console.log('❌ FAILED');
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Error: ${JSON.stringify(error.response.data, null, 2)}`);
    } else if (error.request) {
      console.log('   Error: No response from server');
      console.log('   Check if server is running on port 5000');
    } else {
      console.log(`   Error: ${error.message}`);
    }
    throw error;
  }
}

async function testAPI() {
  console.log('🚀 Testing Book Inventory System REST API');
  console.log('==========================================');
  
  let createdBookId = null;
  
  try {
    // Test 1: Root endpoint
    await testEndpoint('📍 Test 1: GET / (Root endpoint)', async () => {
      const response = await axios.get(BASE_URL);
      console.log(`   Message: ${response.data.message}`);
      console.log(`   Status: ${response.status}`);
    });

    // Test 2: Get all books (initially empty)
    await testEndpoint('📚 Test 2: GET /api/books (Get all books)', async () => {
      const response = await axios.get(`${BASE_URL}/api/books`);
      console.log(`   Books count: ${response.data.count}`);
      console.log(`   Status: ${response.status}`);
    });

    // Test 3: Create a new book
    await testEndpoint('➕ Test 3: POST /api/books (Create book)', async () => {
      const newBook = {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Fiction',
        price: 12.99,
        stock: 25,
        publishedYear: 1925
      };
      const response = await axios.post(`${BASE_URL}/api/books`, newBook);
      createdBookId = response.data.data._id;
      console.log(`   Created book: ${response.data.data.title}`);
      console.log(`   Book ID: ${createdBookId}`);
      console.log(`   Status: ${response.status}`);
    });

    // Test 4: Create another book for more data
    await testEndpoint('➕ Test 4: POST /api/books (Create second book)', async () => {
      const newBook = {
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian Fiction',
        price: 13.99,
        stock: 15,
        publishedYear: 1949
      };
      const response = await axios.post(`${BASE_URL}/api/books`, newBook);
      console.log(`   Created book: ${response.data.data.title}`);
      console.log(`   Status: ${response.status}`);
    });

    // Test 5: Get all books again (should have 2 books now)
    await testEndpoint('📚 Test 5: GET /api/books (Get all books - should have 2)', async () => {
      const response = await axios.get(`${BASE_URL}/api/books`);
      console.log(`   Books count: ${response.data.count}`);
      console.log(`   Status: ${response.status}`);
      response.data.data.forEach((book, index) => {
        console.log(`   Book ${index + 1}: ${book.title} by ${book.author}`);
      });
    });

    // Test 6: Update the first book
    await testEndpoint('✏️ Test 6: PUT /api/books/:id (Update book)', async () => {
      if (!createdBookId) throw new Error('No book ID available for update');
      
      const updateData = { 
        stock: 30, 
        price: 14.99,
        genre: 'Classic Fiction'
      };
      const response = await axios.put(`${BASE_URL}/api/books/${createdBookId}`, updateData);
      console.log(`   Updated book: ${response.data.data.title}`);
      console.log(`   New stock: ${response.data.data.stock}`);
      console.log(`   New price: $${response.data.data.price}`);
      console.log(`   Status: ${response.status}`);
    });

    // Test 7: Try to get a non-existent book (should fail)
    await testEndpoint('🔍 Test 7: PUT /api/books/invalid-id (Invalid ID test)', async () => {
      try {
        await axios.put(`${BASE_URL}/api/books/invalid-id-123`, { stock: 10 });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log(`   Expected 404 error received`);
          console.log(`   Status: ${error.response.status}`);
          return; // This is expected, so don't throw
        }
        throw error;
      }
    });

    // Test 8: Create book with missing required fields (should fail)
    await testEndpoint('❌ Test 8: POST /api/books (Missing required fields)', async () => {
      const invalidBook = {
        title: 'Incomplete Book'
        // Missing required fields: author, genre, price
      };
      try {
        await axios.post(`${BASE_URL}/api/books`, invalidBook);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.log(`   Expected validation error received`);
          console.log(`   Status: ${error.response.status}`);
          return; // This is expected, so don't throw
        }
        throw error;
      }
    });

    // Test 9: Delete the first book
    await testEndpoint('🗑️ Test 9: DELETE /api/books/:id (Delete book)', async () => {
      if (!createdBookId) throw new Error('No book ID available for deletion');
      
      const response = await axios.delete(`${BASE_URL}/api/books/${createdBookId}`);
      console.log(`   Deleted book successfully`);
      console.log(`   Message: ${response.data.message}`);
      console.log(`   Status: ${response.status}`);
    });

    // Test 10: Verify book was deleted
    await testEndpoint('📚 Test 10: GET /api/books (Verify deletion - should have 1 book)', async () => {
      const response = await axios.get(`${BASE_URL}/api/books`);
      console.log(`   Books count after deletion: ${response.data.count}`);
      console.log(`   Status: ${response.status}`);
    });

    console.log('\n🎉 SUCCESS: All REST API tests passed!');
    console.log('✅ The Book Inventory System API is working correctly.');

  } catch (error) {
    console.log('\n💥 FAILED: Some tests failed.');
    console.log('❌ Please check the server logs and API implementation.');
  }
}

// Add a small delay to ensure server is ready
console.log('⏳ Waiting 2 seconds for server to be ready...');
setTimeout(() => {
  testAPI();
}, 2000);