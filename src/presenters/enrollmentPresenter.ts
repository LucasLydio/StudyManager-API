import type { EnrollmentEntity } from "../entities/Enrollment";

export function toEnrollmentJson(enrollment: EnrollmentEntity) {
  return {
    id: enrollment.id,
    user_id: enrollment.userId,
    course_id: enrollment.courseId,
    enrolled_at: enrollment.enrolledAt.toISOString()
  };
}

