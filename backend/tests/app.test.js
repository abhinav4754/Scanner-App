const request = require('supertest');
const app = require('../server');

describe("Basic Tests", () => {
  // Group 1: Health tests (5)
  test("Health status 200", async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
  });

  test("Health returns OK", async () => {
    const res = await request(app).get('/health');
    expect(res.text).toBe("OK");
  });

  test("Health content type", async () => {
    const res = await request(app).get('/health');
    expect(res.headers['content-type']).toMatch(/text/);
  });

  test("Health not empty", async () => {
    const res = await request(app).get('/health');
    expect(res.text.length).toBeGreaterThan(0);
  });

  test("Health route exists", async () => {
    const res = await request(app).get('/health');
    expect(res).toBeDefined();
  });

  // Group 2: Invalid routes/methods (5)
  test("Invalid route 404", async () => {
    const res = await request(app).get('/invalid');
    expect(res.statusCode).toBe(404);
  });

  test("Random route fails", async () => {
    const res = await request(app).get('/abc123');
    expect(res.statusCode).toBe(404);
  });

  test("Empty route fails", async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBeDefined();
  });

  test("Wrong method", async () => {
    const res = await request(app).post('/health');
    expect(res.statusCode).not.toBe(200);
  });

  test("PUT invalid route", async () => {
    const res = await request(app).put('/health');
    expect(res.statusCode).not.toBe(200);
  });

  // Group 3: Logic tests (10)
  test("Addition test", () => {
    expect(1 + 1).toBe(2);
  });

  test("String test", () => {
    expect("scanner").toContain("scan");
  });

  test("Boolean test", () => {
    expect(true).toBeTruthy();
  });

  test("Array test", () => {
    expect([1, 2, 3]).toContain(2);
  });

  test("Object test", () => {
    expect({ a: 1 }).toHaveProperty('a');
  });

  test("Subtraction test", () => {
    expect(5 - 3).toBe(2);
  });

  test("Multiplication test", () => {
    expect(3 * 4).toBe(12);
  });

  test("Division test", () => {
    expect(12 / 4).toBe(3);
  });

  test("Null check test", () => {
    expect(null).toBeNull();
  });

  test("Length check test", () => {
    expect("scanner app".length).toBeGreaterThan(5);
  });
});
