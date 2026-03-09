import type { EnrollmentEntity } from "../entities/Enrollment";

export type CreateEnrollmentInput = {
  userId: number;
  courseId: number;
};

export type EnrollmentWithCourse = {
  id: number;
  userId: number;
  courseId: number;
  enrolledAt: Date;
  course: {
    id: number;
    title: string;
    description: string;
    workload: number;
  };
};

export interface EnrollmentRepository {
  create(input: CreateEnrollmentInput): Promise<EnrollmentEntity>;
  existsByUserAndCourse(userId: number, courseId: number): Promise<boolean>;
  findCoursesByUserId(userId: number): Promise<EnrollmentWithCourse[]>;
}

