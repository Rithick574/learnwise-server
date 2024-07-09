import { IExamResult } from "../../../../../domain/entities";
import { Exam } from "../../models/exams";
import { ExamResult } from "../../models/examResult";

interface SubmittedAnswer {
  question: string;
  selectedOption: string;
}

export const submitExam = async (
  userId: string,
  courseId: string,
  result: { results: SubmittedAnswer[] }
): Promise<IExamResult | boolean> => {
  console.log("🚀 ~ file: submitExam.ts:15 ~ result:", result)
  try {
    const exam = await Exam.findOne({ courseId });
    console.log("🚀 ~ file: submitExam.ts:18 ~ exam:", exam)
    if (!exam) {
      throw new Error("Can't find Exam");
    }

    // Ensure result.results is an array
    const { results } = result;
    if (!Array.isArray(results)) {
      throw new TypeError("Result.results should be an array");
    }

    // Calculate the result
    const correctAnswers: string[] = [];
    const submittedAnswers: string[] = [];
    
    exam.exams.forEach((question: any, index: number) => {
      correctAnswers.push(question.correctOption);
      const submittedAnswer = results.find(answer => answer.question === question._id.toString());
      submittedAnswers.push(submittedAnswer ? submittedAnswer.selectedOption : "");
    });
    
    console.log("🚀 ~ file: submitExam.ts:25 ~ correctAnswers:", correctAnswers)
    console.log("🚀 ~ file: submitExam.ts:27 ~ submittedAnswers:", submittedAnswers)
    let score = 0;
    correctAnswers.forEach((answer, index) => {
      if (answer === submittedAnswers[index]) {
        score++;
      }
    });

    const percentage = (score / exam.exams.length) * 100;

    let examResult = await ExamResult.findOne({ userId, courseId });

    if (examResult) {
      examResult.result = submittedAnswers;
      examResult.percentage = percentage;
      examResult = await examResult.save();
    } else {
      examResult = new ExamResult({
        courseId,
        userId,
        result: submittedAnswers,
        percentage,
      });
      examResult = await examResult.save();
    }

    return examResult;
  } catch (error) {
    console.error("Error submitting exam:", error);
    return false;
  }
};
