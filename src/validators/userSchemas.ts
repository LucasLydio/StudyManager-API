import * as yup from "yup";

export const createUserSchema = yup.object({
  name: yup.string().trim().min(2, "name must be at least 2 characters.").required("name is required."),
  email: yup.string().trim().email("email must be a valid email.").required("email is required.")
});

export const updateUserSchema = yup
  .object({
    name: yup.string().trim().min(2, "name must be at least 2 characters.").optional(),
    email: yup.string().trim().email("email must be a valid email.").optional()
  })
  .test("at-least-one", "At least one field must be provided.", (value) => {
    if (!value) return false;
    return Boolean(value.name || value.email);
  });

