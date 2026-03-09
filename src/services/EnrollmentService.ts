import type { EnrollmentRepository } from "../repositories/EnrollmentRepository";
import type { UserRepository } from "../repositories/UserRepository";
import type { CourseRepository } from "../repositories/CourseRepository";
import { AppError } from "../shared/errors/AppError";
import { ErrorCodes } from "../shared/errors/errorCodes";

export class EnrollmentService {
  constructor(
    private readonly enrollments: EnrollmentRepository,
    private readonly users: UserRepository,
    private readonly courses: CourseRepository
  ) {}

  async create(input: { userId: number; courseId: number }) {
    const user = await this.users.findById(input.userId);
    if (!user) {
      throw new AppError({ statusCode: 404, code: ErrorCodes.NotFound, message: "User not found." });
    }

    const course = await this.courses.findById(input.courseId);
    if (!course) {
      throw new AppError({ statusCode: 404, code: ErrorCodes.NotFound, message: "Course not found." });
    }

    const exists = await this.enrollments.existsByUserAndCourse(input.userId, input.courseId);
    if (exists) {
      throw new AppError({
        statusCode: 409,
        code: ErrorCodes.Conflict,
        message: "Duplicate enrollment is not allowed."
      });
    }

    return this.enrollments.create(input);
  }

  async listUserCourses(userId: number) {
    const user = await this.users.findById(userId);
    if (!user) {
      throw new AppError({ statusCode: 404, code: ErrorCodes.NotFound, message: "User not found." });
    }

    const rows = await this.enrollments.findCoursesByUserId(userId);
    return { user, courses: rows.map((r) => r.course) };
  }
}

