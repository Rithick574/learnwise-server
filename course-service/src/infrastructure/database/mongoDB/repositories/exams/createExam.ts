import { Exam } from "../../models/exams";

export const createExam = async (
  courseId: string,
  questions: any[]
): Promise<any | boolean> => {
  try {

    const formattedQuestions = questions.map((q) => ({
      question: q.question,
      correctOption: q.correctOption,
      options: {
        option1: q.option1,
        option2: q.option2,
        option3: q.option3,
        option4: q.option4,
      },
    }));

    let exam = await Exam.findOne({ courseId });
  
  if (exam) {
    exam.exams = formattedQuestions;
  } else {
       exam = new Exam({
        courseId: courseId,
        exams: formattedQuestions,
      });
  }
  return await exam.save();
  } catch (error) {
    throw new Error((error as Error)?.message);
  }
};
