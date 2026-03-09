import type { CourseRepository, CreateCourseInput, UpdateCourseInput } from "../repositories/CourseRepository";
import { AppError } from "../shared/errors/AppError";
import { ErrorCodes } from "../shared/errors/errorCodes";

export class CourseService {
  constructor(private readonly courses: CourseRepository) {}

  async create(input: CreateCourseInput) {
    return this.courses.create(input);
  }

  async list() {
    return this.courses.findMany();
  }

  async getById(id: number) {
    const course = await this.courses.findById(id);
    if (!course) {
      throw new AppError({ statusCode: 404, code: ErrorCodes.NotFound, message: "Course not found." });
    }
    return course;
  }

  async update(id: number, input: UpdateCourseInput) {
    const existing = await this.courses.findById(id);
    if (!existing) {
      throw new AppError({ statusCode: 404, code: ErrorCodes.NotFound, message: "Course not found." });
    }
    return this.courses.update(id, input);
  }

  async delete(id: number) {
    const existing = await this.courses.findById(id);
    if (!existing) {
      throw new AppError({ statusCode: 404, code: ErrorCodes.NotFound, message: "Course not found." });
    }
    await this.courses.delete(id);
  }
}

