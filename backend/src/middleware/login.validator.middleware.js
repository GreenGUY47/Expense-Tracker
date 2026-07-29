import { z } from "zod";


const loginSchema = z
.object({
    userName:z
    .string()
    .trim()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
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
      })
})


export default loginSchema;