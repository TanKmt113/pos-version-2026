import { z } from "zod";
export const UserSchema = z.object({
  name: z.string().min(2, "Tên quá ngắn").max(5, "Tên quá dài")
})
export type UserInput = z.infer<typeof UserSchema>