const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({name: undefined, postCount: 0});
    const validationResult = user.validateSync();
    const {message} = validationResult.errors.name;
    assert(message === 'Name is required.')
  })

  it('requires a name length 2', () => {
    const user = new User({name: 'Al', postCount: 0});
    const validationResult = user.validateSync();
    const {message} = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters.')
  })


  it('prevents invalid records from being saved', (done) => {
    const user = new User({name: 'Al', postCount: 0});
    user.save().catch((err) => {
      const {message} = err.errors.name;
      assert(message === 'Name must be longer than 2 characters.');
      done();
    })

  })
});