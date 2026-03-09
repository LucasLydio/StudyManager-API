import type { CourseEntity } from "../entities/Course";

export function toCourseJson(course: CourseEntity) {
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    workload: course.workload
  };
}

