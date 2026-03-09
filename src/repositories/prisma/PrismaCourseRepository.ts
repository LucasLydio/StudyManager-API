import type { CourseRepository, CreateCourseInput, UpdateCourseInput } from "../CourseRepository";
import type { CourseEntity } from "../../entities/Course";
import { prisma } from "../../infrastructure/prisma/prismaClient";

function toEntity(row: { id: number; title: string; description: string; workload: number }): CourseEntity {
  return { id: row.id, title: row.title, description: row.description, workload: row.workload };
}

export class PrismaCourseRepository implements CourseRepository {
  async create(input: CreateCourseInput): Promise<CourseEntity> {
    const row = await prisma.course.create({ data: input });
    return toEntity(row);
  }

  async findMany(): Promise<CourseEntity[]> {
    const rows = await prisma.course.findMany({ orderBy: { id: "asc" } });
    return rows.map(toEntity);
  }

  async findById(id: number): Promise<CourseEntity | null> {
    const row = await prisma.course.findUnique({ where: { id } });
    return row ? toEntity(row) : null;
  }

  async update(id: number, input: UpdateCourseInput): Promise<CourseEntity> {
    const row = await prisma.course.update({ where: { id }, data: input });
    return toEntity(row);
  }

  async delete(id: number): Promise<void> {
    await prisma.course.delete({ where: { id } });
  }
}

