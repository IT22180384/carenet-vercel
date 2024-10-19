// __tests__/setup/testSetup.js
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server-core';

let mongoServer;

// Setup before all __tests__
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

// Cleanup after all __tests__ are done
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