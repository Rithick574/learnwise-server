const mongoose = require('mongoose');
const { Schema } = mongoose;


const QuestionSchema = new Schema({
  question: { type: String, required: true },
  correctOption: { type: String, required: true },
  options: {
    type: Map,
    of: String,
    required: true,
  },
});


const ExamSchema = new Schema({
  courseId: { type: String, required: true },
  exams: { type: [QuestionSchema], required: true },
});


const Question = mongoose.model('Question', QuestionSchema);
export const Exam = mongoose.model('Exam', ExamSchema);

module.exports = { Question, Exam };
