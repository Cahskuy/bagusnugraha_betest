const request = require("supertest");
const app = require("../app");
let server;

beforeAll((done) => {
  server = app.listen(done);
});

afterAll((done) => {
  server.close(done);
});

describe("Auth", () => {
  describe("POST /api/auth/signup", () => {
    const dataDummy = {
      fullName: "John Doe",
      email: "johndoe@example.com",
      userName: "johndoe123",
      password: "password123",
    };

    it("should return 201 for success signup", async () => {
      const res = await request(app).post("/api/auth/signup").send(dataDummy);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty(
        "message",
        "User registered successfully"
      );
    });

    it("should return 400 for invalid input validation", async () => {
      const res = await request(app)
        .post("/api/auth/signup")
        .send({ fullName: "testing" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
    });

    it("should return 400 for duplicate data", async () => {
      const res = await request(app).post("/api/auth/signup").send(dataDummy);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login and return a JWT token", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ userName: "cahskuy", password: "password123" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
    });

    it("should return 401 for invalid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ userName: "wrongUser", password: "wrongPassword" });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid credentials");
    });
  });
});
