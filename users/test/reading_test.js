const assert = require('assert');
const User = require('../src/user');

describe('reading users from db ', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe'});
    joe.save().then(() => {
      done();
    })
  });
  it('finds all users with name joe', (done) => {
    User.find( {name: 'Joe' }).then((users) => {
      assert(users[0]._id.toString() == joe._id);
      done();
    });
  });

  it('find a user with a particular id', (done) => {
    User.findOne({ _id: joe._id }).then((user) => {
      assert(user._id.toString() == joe._id);
      assert(user.name == 'Joe');
      done();
    });
  })
})