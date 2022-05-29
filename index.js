// Copy this directory 'C:\Program Files\MongoDB\Server\5.0\bin'
// Paste this on Environment variable's path
// create this folder and directory 'C:\data\db'
// on cmd, run 'mongod'

const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log('Could not connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: 'NodeJS course',
    author: 'Ashvin',
    tags: ['node', 'backend'],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
};

createCourse();
