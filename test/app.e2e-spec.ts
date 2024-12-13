import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const TEST_USER = 'jest3';
const TEST_PASSWORD = 'Jest';
const TEST_GITHUBNAME = 'Killian-Habasque';

let app: INestApplication;
let token: string;
let userId: string;
let tagId: string;

describe('AppController (e2e)', () => {
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

  afterAll(async () => {
    await app.close();
  });
});

describe('Auth e2e', () => {
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
        username: TEST_USER,
        password: TEST_PASSWORD,
        githubname: TEST_GITHUBNAME
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('username', TEST_USER);
      });
  });

  it('/auth/login (POST) - should return 201 and a token if credentials are correct', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: TEST_USER,
        password: TEST_PASSWORD,
      })
      .expect(201);

    expect(response.body).toHaveProperty('access_token');
    token = response.body.access_token;
  });

  it('/users/me (GET) - should return user info if authenticated', async () => {
    expect(token).toBeDefined();

    const response = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty('username', TEST_USER);
    userId = response.body.id;
  });

  afterAll(async () => {
    await app.close();
  });
});

describe('Tags e2e', () => {
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: TEST_USER, password: TEST_PASSWORD })
      .expect(201);

    token = response.body.access_token;
  });

  it('/tags (POST) - should create a new tag', async () => {
    const response = await request(app.getHttpServer())
      .post('/tags')
      .set('Authorization', `Bearer ${token}`)
      .send({ label: 'New Tag', slug: "new-tag" })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('label', 'New Tag');
    tagId = response.body.id;
  });

  it('/tags/:id (PATCH) - should update a tag', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/tags/${tagId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ label: 'Updated Tag' })
      .expect(200);

    expect(response.body).toHaveProperty('id', tagId);
    expect(response.body).toHaveProperty('label', 'Updated Tag');
  });

  it('/tags/github-topics (GET) - should retrieve GitHub topics for authenticated user', async () => {
    expect(token).toBeDefined();

    const response = await request(app.getHttpServer())
      .get('/tags/github-topics')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/feed (GET) - should retrieve the feed for authenticated user', async () => {
    expect(token).toBeDefined();

    const response = await request(app.getHttpServer())
      .get('/feed')
      .set('Authorization', `Bearer ${token}`)
      .query({ maxResults: '5' })
      .expect(200);

    expect(response.body).toHaveProperty('items');
    expect(Array.isArray(response.body.items)).toBe(true);

    response.body.items.forEach((item) => {
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('url');
    });
  });

  afterAll(async () => {
    if (tagId) {
      await request(app.getHttpServer())
        .delete(`/tags/${tagId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    }

    if (userId) {
      await request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    }
    await app.close();
  });
});