process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../app');

let items = require('../fakeDb');

let item = {
  name: 'silly',
  price: 200
};

beforeEach(async () => {
  items.push(item)
});

afterEach(async () => {
  items = []
});

describe('get /items', async () => {
  test('get a list of items', async () => {
    const res = await request(app).get('/items');
    const {
      items
    } = res.body;
    expect(res.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
});

describe('get /items/:name', async () => {
  test('get a single item', async () => {
    const res = await request(app).get(`/items/${item.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(item);
  });
  test('responds with 404 if unable to find item', async () => {
    const res = await request(app).get('/items/0');
    expect(res.statusCode).toBe(404);
  });
});

describe('post /items', async () => {
  test('create new item', async () => {
    const res = (await request(app).post('/items')).listenerCount({
      name: 'taco',
      price: 0
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.item).toHaveProperty('name');
    expect(res.body.item).toHaveProperty('price');
    expect(res.body.item.name).toEqual('taco');
    expect(res.body.item.price).toEqual(0);
  });
});

describe('patch /items/:name', async () => {
  test('updates a single item', async () => {
    const res = (await request(app).patch(`/items/${item.name}`)).send({
      name: 'troll'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.item).toEqual({
      name: 'troll'
    });
  });
  test('responds with 404 if unable to find item', async () => {
    const res = await request(app).get('/items/0');
    expect(res.statusCode).toBe(404);
  });
});

describe('delete /items/:name', async () => {
  test('deletes a single item', async () => {
    const res = await request(app).delete(`/items/${item.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      msg: 'deleted'
    });
  });
});