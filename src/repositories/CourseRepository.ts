import type { CourseEntity } from "../entities/Course";

export type CreateCourseInput = {
  title: string;
  description: string;
  workload: number;
};

export type UpdateCourseInput = {
  title?: string;
  description?: string;
  workload?: number;
};

export interface CourseRepository {
  create(input: CreateCourseInput): Promise<CourseEntity>;
  findMany(): Promise<CourseEntity[]>;
  findById(id: number): Promise<CourseEntity | null>;
  update(id: number, input: UpdateCourseInput): Promise<CourseEntity>;
  delete(id: number): Promise<void>;
}

