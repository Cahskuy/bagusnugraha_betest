const request = require("supertest");
const app = require("../app");
let server;

beforeAll((done) => {
  server = app.listen(done);
});

afterAll((done) => {
  server.close(done);
});

describe("User", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiJBLWcwNGQwOHFudyIsImlhdCI6MTcyMDQ5MzY1MSwiZXhwIjoxNzIwNTgwMDUxfQ.hYJnzMEK-tq8xRrsym6j00tlJEPupZ7SJfYz_s8UCeM";

  describe("GET api/user/account-number/:accountNumber", () => {
    it("should return 200 for get data", async () => {
      const res = await request(app)
        .get("/api/user/account-number/ACC-edaa7qmvg")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("userId");
      expect(res.body).toHaveProperty("fullName");
      expect(res.body).toHaveProperty("accountNumber");
    });

    it("should return 404 for user not found", async () => {
      const res = await request(app)
        .get("/api/user/account-number/testing")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", "User not found");
    });

    it("should return 401 for unauthorized", async () => {
      const res = await request(app).get("/api/user/account-number/testing");

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("GET api/user/registration-number/:registrationNumber", () => {
    it("should return 200 for get data", async () => {
      const res = await request(app)
        .get("/api/user/account-number/ACC-edaa7qmvg")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("userId");
      expect(res.body).toHaveProperty("fullName");
      expect(res.body).toHaveProperty("accountNumber");
    });

    it("should return 404 for user not found", async () => {
      const res = await request(app)
        .get("/api/user/registration-number/testing")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", "User not found");
    });

    it("should return 401 for unauthorized", async () => {
      const res = await request(app).get(
        "/api/user/registration-number/testing"
      );

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("GET api/user/login-three-days-ago", () => {
    it("should return 200 for get data", async () => {
      const res = await request(app)
        .get("/api/user/login-three-days-ago")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should return 401 for unauthorized", async () => {
      const res = await request(app).get("/api/user/login-three-days-ago");

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message");
    });
  });
});
