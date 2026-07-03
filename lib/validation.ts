import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập tên (ít nhất 2 ký tự)"),
  phone: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập số điện thoại")
    .regex(/^[0-9+\-\s()]{10,}$/, "Số điện thoại không hợp lệ"),
  email: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập email")
    .email("Email không hợp lệ"),
});

export type RegistrationData = z.infer<typeof registrationSchema>;
