const server = require('../app');
const supertest = require('supertest');
const { posts, users } = require("../models");

let userIds;
beforeAll(async () => {
    // const driver = async () => {
    // try {
    //     await sequelize.sync();
    // } catch (err) {
    //     console.error('초기화 실패');
    //     console.error(err);
    //     return;
    // }
    // console.log('초기화 완료.');
    // }

    // driver();
    const user = await users.create({
        userName: "test",
        email: "test",
        profile: '',
        pw: "123",
        birthday: "test",
        gender: "남",
        salt: "test",
      });
    const posts = await posts.create({
        userId: user.userId,
        content: "test",
        image: "test",
        insertDt: "test",
        userName: user.userName,
      });
    userIds = user.userId;
});

describe('test for auth', () => {
    app = supertest(server);
    test('too short password', async () => {
        const res = await app.post('/api/poser').send({
        });
        expect(res.status).toBe(200);
        expect(res.text).toBe('test');
    });
});

afterAll(async () => {
    await users.destroy({ where: { userId: userIds } });
    await posts.destroy({ where: { userId: userIds } });
})