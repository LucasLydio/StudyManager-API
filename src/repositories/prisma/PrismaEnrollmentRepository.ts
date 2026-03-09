import type {
  EnrollmentRepository,
  CreateEnrollmentInput,
  EnrollmentWithCourse
} from "../EnrollmentRepository";
import type { EnrollmentEntity } from "../../entities/Enrollment";
import { prisma } from "../../infrastructure/prisma/prismaClient";

function toEntity(row: { id: number; userId: number; courseId: number; enrolledAt: Date }): EnrollmentEntity {
  return { id: row.id, userId: row.userId, courseId: row.courseId, enrolledAt: row.enrolledAt };
}

export class PrismaEnrollmentRepository implements EnrollmentRepository {
  async create(input: CreateEnrollmentInput): Promise<EnrollmentEntity> {
    const row = await prisma.enrollment.create({ data: input });
    return toEntity(row);
  }

  async existsByUserAndCourse(userId: number, courseId: number): Promise<boolean> {
    const row = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
      select: { id: true }
    });
    return Boolean(row);
  }

  async findCoursesByUserId(userId: number): Promise<EnrollmentWithCourse[]> {
    const rows = await prisma.enrollment.findMany({
      where: { userId },
      orderBy: { enrolledAt: "desc" },
      include: { course: true }
    });

    return rows.map((row) => ({
      id: row.id,
      userId: row.userId,
      courseId: row.courseId,
      enrolledAt: row.enrolledAt,
      course: {
        id: row.course.id,
        title: row.course.title,
        description: row.course.description,
        workload: row.course.workload
      }
    }));
  }
}

