const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post')

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate:{
      validator: (name) => {
        return name.length > 2
      },
      message: 'Name must be longer than 2 characters.'
    }
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'}]
});

UserSchema.virtual('postCount').get(function(){
  return this.posts.length
});

const User = mongoose.model('user', UserSchema);

module.exports = User;