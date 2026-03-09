import * as yup from "yup";

export const createEnrollmentSchema = yup.object({
  userId: yup
    .number()
    .transform((value, originalValue) => (typeof originalValue === "string" ? Number(originalValue) : value))
    .typeError("userId must be a number.")
    .integer("userId must be an integer.")
    .positive("userId must be a positive number.")
    .required("userId is required."),
  courseId: yup
    .number()
    .transform((value, originalValue) => (typeof originalValue === "string" ? Number(originalValue) : value))
    .typeError("courseId must be a number.")
    .integer("courseId must be an integer.")
    .positive("courseId must be a positive number.")
    .required("courseId is required.")
});

