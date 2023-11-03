import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is Required').max(255, 'Title should be lessor equal to 255 characters'),
  description: z.string().min(1, 'Description is required'),
});
