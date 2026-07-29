import { z } from "zod";

const registerSchema = z
  .object({
    userName: z
      .string()
      .trim()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),

    email: z.string().trim().toLowerCase().email("Invalid email address"),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password must be under 20 characters" })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Add an uppercase letter",
      })
      .refine((val) => /[a-z]/.test(val), {
        message: "Add a lowercase letter",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Add a number",
      })
      .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: "Add a special character",
      }),

    confirmPassword: z.string().trim(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export default registerSchema;
