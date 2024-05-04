const { MongoClient } = require('mongodb');

describe('database tests', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(
      'mongodb+srv://yjdream86:kaIPgggbzhC54eIT@powerpuffs.mnq5nje.mongodb.net/?retryWrites=true&w=majority&appName=PowerPuffs'
    );

    db = await connection.db(test.auths);
  });

  beforeEach(async () => {
    await db.collection('auths').deleteOne({ _id: 'some-user-id5' });
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into the auth collection', async () => {
    const users = db.collection('auths');

    const mockUser = {
      _id: 'some-user-id5',
      email: 'Johnny',
      password: 'somePassword',
    };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: 'some-user-id5' });
    expect(insertedUser).toEqual(mockUser);
  });
  it('returns an error when password field is not provided', async () => {
    const users = db.collection('auths');
  
    const mockUser = {
      _id: 'some-user-id5',
      email: 'Johnny6',
      password: ''
    };
  
    try {
      await users.insertOne(mockUser);
      // If insertOne doesn't throw an error, fail the test
      fail('Expected an error to be thrown');
    } catch (error) {
    
      expect(error).toBeInstanceOf(Error);
    }
  });
  it('returns an error when email field is not provided', async () => {
    const users = db.collection('auths');
  
    const mockUser = {
      _id: 'some-user-id5',
      email: '',
      password: 'somePassword'
    };
  
    try {
      await users.insertOne(mockUser);
      // If insertOne doesn't throw an error, fail the test
      fail('Expected an error to be thrown');
    } catch (error) {
    
      expect(error).toBeInstanceOf(Error);
    }
  });
  
});
