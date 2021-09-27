import { NextApiRequest, NextApiResponse } from 'next'

import { createIssue } from 'lib/linear'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'POST') {
    return res.status(404).end()
  }

  const fields: string[] = [
    req.body?.author,
    req.body?.team,
    req.body?.title,
    req.body?.description,
    req.body?.steps,
    req.body?.technical,
    req.body?.priority,
  ]

  if (fields.some((field) => !field || typeof field !== 'string')) {
    return res.status(400).json({
      message: `Invalid payload for ${fields.filter(
        (field) => !field || typeof field !== 'string'
      )}`,
    })
  }

  try {
    const attachments: string[] = req.body?.attachments || []
    const [author, team, title, description, steps, technical, priority] =
      fields

    await createIssue({
      author,
      team,
      title,
      description,
      steps,
      technical,
      priority,
      attachments,
    })

    return res.status(200).json({ message: 'ok' })
  } catch (error) {
    return res.status(400).json({ message: 'Invalid code' })
  }
}
