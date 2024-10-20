// __tests__/integration/serviceRoute.test.js
import request from "supertest";
import express from "express";
import serviceRoute from "../../routes/Health_Card/serviceRoute.js";
import { Service } from "../../models/serviceModel.js";

const app = express();
app.use(express.json());
app.use("/api", serviceRoute);

describe("Service Management System Tests", () => {
  describe("Service Creation Tests", () => {
    const validServiceData = {
      title: "Health Checkup",
      name: "General Health Check",
      description: "Complete health checkup for all age groups",
      price: 150,
      image: "https://example.com/image.jpg",
    };

    test("should successfully create a service with valid data", async () => {
      const response = await request(app).post("/api").send(validServiceData);

      expect(response.status).toBe(201);
      expect(response.body.service).toHaveProperty("_id");
      expect(response.body.service.title).toBe(validServiceData.title);
      expect(response.body.service.price).toBe(validServiceData.price);
    });

    test("should fail to create service with missing required fields", async () => {
      const invalidData = {
        title: "Health Checkup",
      };

      const response = await request(app).post("/api").send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toMatch(
        /required fields must be provided/i
      );
    });
  });

  describe("Service Retrieval Tests", () => {
    let createdService;

    beforeEach(async () => {
      createdService = await Service.create({
        title: "Dental Cleaning",
        name: "Teeth Cleaning",
        description: "Routine dental cleaning service",
        price: 100,
        image: "https://example.com/dental.jpg",
      });
    });

    test("should successfully retrieve a service by ID", async () => {
      const response = await request(app).get(`/api/${createdService._id}`);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(createdService.title);
      expect(response.body.price).toBe(createdService.price);
    });

    test("should fail to retrieve service with invalid ID", async () => {
      const response = await request(app).get("/api/invalidServiceId123");

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Internal Server Error");
    });
  });

  describe("Service Update Tests", () => {
    let createdService;

    beforeEach(async () => {
      createdService = await Service.create({
        title: "Vision Test",
        name: "Eye Examination",
        description: "Comprehensive eye examination service",
        price: 200,
        image: "https://example.com/eye-test.jpg",
      });
    });

    test("should successfully update a service by ID", async () => {
      const updatedData = {
        title: "Vision Test Updated",
        price: 250,
      };

      const response = await request(app)
        .put(`/api/${createdService._id}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updatedData.title);
      expect(response.body.price).toBe(updatedData.price);
    });

    test("should fail to update service with invalid ID", async () => {
      const updatedData = {
        title: "Invalid Service",
        price: 300,
      };

      const response = await request(app)
        .put("/api/invalidServiceId123")
        .send(updatedData);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Internal Server Error");
    });
  });

  describe("Service Deletion Tests", () => {
    let createdService;

    beforeEach(async () => {
      createdService = await Service.create({
        title: "Blood Test",
        name: "Routine Blood Work",
        description: "Complete blood test service",
        price: 80,
        image: "https://example.com/blood-test.jpg",
      });
    });

    test("should successfully delete a service by ID", async () => {
      const response = await request(app).delete(`/api/${createdService._id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Service deleted successfully");
    });

    test("should fail to delete service with invalid ID", async () => {
      const response = await request(app).delete("/api/invalidServiceId123");

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Internal Server Error");
    });
  });
});
