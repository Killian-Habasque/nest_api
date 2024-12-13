import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({
        name: 'Hello World!',
        doc: 'url to the document',
      });
  });

});

describe('Auth e2e', () => {
  let app: INestApplication;
  let token: string; 
  let userId: string; 

  beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
  });

  it('/users/me (GET) - should return 401 if not authenticated', () => {
      return request(app.getHttpServer())
          .get('/users/me')
          .expect(401)
          .expect((res) => {
              expect(res.body).toHaveProperty('statusCode', 401);
              expect(res.body).toHaveProperty('message', 'Unauthorized');
          });
  });

  it('/auth/login (POST) - should return 401 if credentials are wrong', () => {
      return request(app.getHttpServer())
          .post('/auth/login')
          .send({
              username: 'wrongUser',
              password: 'wrongPassword',
          })
          .expect(401)
          .expect((res) => {
              expect(res.body).toHaveProperty('statusCode', 401);
              expect(res.body).toHaveProperty('message', 'Unauthorized');
          });
  });

  it('/auth/register (POST) - should return 201 if credentials are correct', () => {
      return request(app.getHttpServer())
          .post('/auth/register')
          .send({
              username: 'jest3',
              password: 'Jest',
          })
          .expect(201)
          .expect((res) => {
              expect(res.body).toHaveProperty('username', 'jest3');
          });
  });

  it('/auth/login (POST) - should return 201 and a token if credentials are correct', async () => {
      const response = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
              username: 'jest3',
              password: 'Jest',
          })
          .expect(201);

      expect(response.body).toHaveProperty('access_token');
      expect(typeof response.body.access_token).toBe('string');
      token = response.body.access_token;
  });

  it('/users/me (GET) - should return user info if authenticated', async () => {
      expect(token).toBeDefined();

      const response = await request(app.getHttpServer())
          .get('/users/me')
          .set('Authorization', `Bearer ${token}`)
          .expect(200);

      expect(response.body).toHaveProperty('username', 'jest3');
      userId = response.body.id; 
  });

  it('/users/:id (DELETE) - should delete user if authenticated', async () => {
      expect(token).toBeDefined();
      expect(userId).toBeDefined();  

      return request(app.getHttpServer())
          .delete(`/users/${userId}`)  
          .set('Authorization', `Bearer ${token}`) 
          .expect(200)
          .expect((res) => {
              expect(res.body).toHaveProperty('message', 'User deleted successfully');  // Vérifie la réponse
          });
  });


  afterAll(async () => {
      await app.close();
  });
});