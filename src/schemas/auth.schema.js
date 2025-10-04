import z from "zod";

export const loginSchema = z.object({
  email: z
    .string({ requerid_error: "Username is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ requerid_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const registerSchema = z.object({
  email: z
    .string({ requerid_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ requerid_error: "Password is required" })
    // .min(6, { message: "Password must be at least 6 characters" }),
});
