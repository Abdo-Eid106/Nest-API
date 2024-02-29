import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('e2e testing', () => {
  let app: INestApplication;
  let cookies: string[];
  const email: string = 'abdoeid@gmail.com';
  const password: string = '12345678';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('test sign up', async () => {
    const res = await request(app.getHttpServer()).post('/auth/signup').send({
      email,
      password,
    });
    expect(res.status).toBe(201);
  });

  it('test the signin', async () => {
    const res = await request(app.getHttpServer()).post('/auth/signin').send({
      email,
      password,
    });
    expect(res.status).toBe(201);

    cookies = res.get('Set-Cookie');
  });

  it('test me', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Cookie', cookies)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
