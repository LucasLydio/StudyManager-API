import * as yup from "yup";

export const idParamSchema = yup.object({
  id: yup
    .number()
    .transform((value, originalValue) => (typeof originalValue === "string" ? Number(originalValue) : value))
    .typeError("id must be a number.")
    .integer("id must be an integer.")
    .positive("id must be a positive number.")
    .required("id is required.")
});

