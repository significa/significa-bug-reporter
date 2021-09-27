import { NextApiRequest, NextApiResponse } from 'next'

import { getTeamNameFromCode } from 'lib/linear'

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
    const name = await getTeamNameFromCode(req.body.code)

    if (!name) {
      throw new Error('No team found')
    }

    return res.status(200).json({ message: 'ok', name })
  } catch (error) {
    return res.status(400).json({ message: 'Invalid code' })
  }
}
