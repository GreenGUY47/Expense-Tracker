import { z } from "zod";

export const registerSchema = z.object({
  userName: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Username must be at least 3 characters.")
    .max(20, "Username cannot exceed 20 characters."),

  email: z.string().trim().toLowerCase().email("Invalid email address."),

  password: z.string().min(8, "Password must contain at least 8 characters.").max(100),
});
