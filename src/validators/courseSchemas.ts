import * as yup from "yup";

export const createCourseSchema = yup.object({
  title: yup.string().trim().min(2, "title must be at least 2 characters.").required("title is required."),
  description: yup
    .string()
    .trim()
    .min(5, "description must be at least 5 characters.")
    .required("description is required."),
  workload: yup
    .number()
    .transform((value, originalValue) => (typeof originalValue === "string" ? Number(originalValue) : value))
    .typeError("workload must be a number.")
    .integer("workload must be an integer.")
    .positive("workload must be a positive number.")
    .required("workload is required.")
});

export const updateCourseSchema = yup
  .object({
    title: yup.string().trim().min(2, "title must be at least 2 characters.").optional(),
    description: yup.string().trim().min(5, "description must be at least 5 characters.").optional(),
    workload: yup
      .number()
      .transform((value, originalValue) => (typeof originalValue === "string" ? Number(originalValue) : value))
      .typeError("workload must be a number.")
      .integer("workload must be an integer.")
      .positive("workload must be a positive number.")
      .optional()
  })
  .test("at-least-one", "At least one field must be provided.", (value) => {
    if (!value) return false;
    return Boolean(value.title || value.description || value.workload !== undefined);
  });

