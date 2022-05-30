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
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  category: {
    type: String,
    enum: ['web', 'mobile', 'network'],
    lowercase: true, // will automatically convert the string to lowercase
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: 'A course should have at least one tag',
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model('Course', courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: 'NodeJS course',
    category: '-',
    author: 'Ashvin',
    tags: null,
    price: 100,
    isPublished: true,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) {
      // check ex properties
      console.log(ex.errors[field]);
    }
    // console.log(ex.message);
  }
};

// createCourse();

const getCourses = async () => {
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)
  return await Course.find({ author: 'Ashvin', isPublished: true })
    // .find({ price: { $gte: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })
    // Starts with Ash
    // .find({ author: /^Ash/ })

    // End with Sunga and insensitive
    // .find({ author: /Sunga$/i })

    // Contains Ash and insensitive
    // .find({ author: /.*Mosh.*/i })
    // .find()
    // .or([{ author: 'Ashvin' }, { isPublished: true }])
    .limit(10)
    .sort({ name: 1 })
    // .select({ name: 1, tags: 1 });
    // return the results returned
    .count();
};

const run = async () => {
  const courses = await getCourses();
  console.log(courses);
};

// run();

// Update a document using Query first approach
const updateCourse1 = async (id) => {
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = 'Another Author';

  const result = awaitcourse.save();
  console.log(result);
};

// updateCourse('insertanidhere!');

// Update a document using Update first approach

// #1
const updateCourse2 = async (id) => {
  const course = await Course.update(
    { _id: id },
    {
      $set: {
        author: 'Ashvin',
        isPublished: false,
      },
    }
  );
  console.log(result);
};

// #2
// const updateCourse2 = async (id) => {
//   const result = await Course.findByIdAndUpdate(
//     id,
//     {
//       $set: {
//         author: 'Ashvin',
//         isPublished: false,
//       },
//     },
//     { new: true } // will return the newly updated document
//   );
//   console.log(result);
// };

// Remove course
const removeCourse = async (id) => {
  //   const result = await Course.deleteOne({ _id: id });
  const course = await Course.findByIdAndRemove(id);
  console.log(result);
};

// removeCourse('enteradocumentidhere');
