import { LinearClient } from '@linear/sdk'
import { NextApiRequest, NextApiResponse } from 'next'

const linearClient = new LinearClient({
  accessToken: process.env.LINEAR_OAUTH_ACCESS_TOKEN,
})

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'POST') {
    return res.status(404).end()
  }

  if (!req.body?.code || typeof req.body.code !== 'string') {
    return res.status(400).json({ message: 'Missing or invalid code' })
  }

  try {
    const id = Buffer.from(req.body.code, 'base64').toString('utf-8')
    const { nodes } = await linearClient.teams({
      filter: {
        id: {
          eq: id,
        },
      },
    })

    if (nodes.length === 0) {
      throw new Error('No team found')
    }

    return res.status(200).json({ message: 'ok', name: nodes[0].name })
  } catch (error) {
    return res.status(400).json({ message: 'Invalid code' })
  }
}
