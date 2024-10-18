// __tests__/setup/testSetup.js
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

// Setup before all tests
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

// Cleanup after all tests are done
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

// Clear all test data after each test
afterEach(async () => {
    const collections = Object.values(mongoose.connection.collections);
    for (const collection of collections) {
        await collection.deleteMany();
    }
});