import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth e2e', () => {
    let app: INestApplication;

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
                expect(res.body).toEqual({});
            });
    });

    it('/auth/login (POST) - should return 201 if credentials are correct', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({
                username: 'jest3',
                password: 'Jest',
            })
            .expect(201)
            .expect((res) => {
                expect(res.body).toHaveProperty('access_token');
                expect(typeof res.body.access_token).toBe('string');
            });
    });
});
