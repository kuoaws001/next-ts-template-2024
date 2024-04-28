import { z } from 'zod'

const schema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().max(5),
})

export default schema

  