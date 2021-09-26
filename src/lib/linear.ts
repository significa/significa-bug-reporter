import { LinearClient } from '@linear/sdk'

// Api key authentication
export const linearClient = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY,
})
