const mongoose = require('mongoose');
const schema = mongoose.Schema;

const chapterSchema = schema({
    title: String,
    nbOfCourses: { type: Number, required:true },
    index: Number,
    active: Boolean,
}, {
    timestamps: true
})

const Chapters = mongoose.model('chapters', chapterSchema);

module.exports = Chapters;
