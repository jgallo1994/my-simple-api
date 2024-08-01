import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/userRoutes';

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

describe('User API', () => {
  const generateUniqueEmail = () => `test-${Date.now()}@example.com`;

  it('should create a user', async () => {
    const email = generateUniqueEmail();
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('John Doe');
  });

  it('should get a user by ID', async () => {
    const email = generateUniqueEmail();
    const createResponse = await request(app).post('/users').send({
      name: 'Jane Doe',
      email,
    });
    const userId = createResponse.body.id;

    const response = await request(app).get(`/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Jane Doe');
  });

  it('should get all users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
