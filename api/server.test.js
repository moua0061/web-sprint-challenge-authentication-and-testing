// Write your tests here
const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig')

const user1 = {
    username: 'redd',
    password: '1234'
}

const user2 = {
    username: 'lia',
    password: '1234'
}

const user3 = {
    username: '',
    password: ''
}

beforeAll( async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach( async () => {
    await db.seed.run
})

beforeEach( async () => {
    await db('users').truncate()
})

afterAll( async () => {
    await db.destroy()
})


test('sanity', () => {
  expect(true).toBe(true)
})

describe('[GET] jokes', () => {
    test('returns error status', async () => {
        const res = await request(server).get('api/jokes')
        expect(res.status).toBe(403)
    })
    test('returns an error message', async () => {
      const res = await request(server).get('/api/jokes')
      expect(res.body.message).toBe('token required')
    })
})

describe('[POST] login', () => {
  test('returns error status', async () => {
    const res = await request(server).post('/api/auth/login').send(user1)
    expect(res.status).toBe(422)
  })
  test('returns error message', async () => {
    const res = await request(server).post('/api/auth/login').send(user3)
    expect(res.body.message).toBe('username and password required')
  })
})

describe('[POST] register username and password valid', () => {
  test('returns error status', async () => {
    const res = await request(server).post('/api/auth/register').send(user3)
    expect(res.status).toBe(422)
  })
  test('returns error message', async () => {
    const res = await request(server).post('/api/auth/register').send(user3)
    expect(res.body.message).toBe('username and password required')
  })
})

describe('[POST] register username exists', () => {
  test('returns error status', async () => {
    const user = await request(server).post('/api/auth/register').send(user2)
    const res = await request(server).post('/api/auth/register').send(user2)
    expect(res.status).toBe(422)
  })
  test('returns error message', async () => {
    const user = await request(server).post('/api/auth/register').send(user1)
    const res = await request(server).post('/api/auth/register').send(user1)
    expect(res.body.message).toBe('username taken')
  })
})


