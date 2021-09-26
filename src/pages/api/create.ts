import { LinearClient } from '@linear/sdk'
import { NextApiRequest, NextApiResponse } from 'next'

const linearClient = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY,
})

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'POST') {
    res.status(404).end()
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
    const [author, team, title, description, steps, technical, priority] =
      fields

    const teamId = Buffer.from(team, 'base64').toString('utf-8')

    const priorityLabel: Record<string, string> = {
      low: '🟢 **Low**',
      medium: '🟡 **Medium**',
      high: '🟠 **High**',
      critical: '🔴 **Critical**',
    }

    const { success, issue } = await linearClient.issueCreate({
      teamId,
      title,
      description:
        '## Description\n' +
        '___ \n' +
        description +
        '&nbsp;  \n' +
        '&nbsp;  \n' +
        '## Steps to reproduce\n' +
        '___ \n' +
        steps +
        '&nbsp;  \n' +
        '&nbsp;  \n' +
        '## Technical Information\n' +
        '___ \n' +
        technical +
        '&nbsp;  \n' +
        '&nbsp;  \n' +
        `${priorityLabel[priority]} priority bug reported by ${author}`,
    })

    if (!success) {
      throw new Error("Couldn't create issue")
    }

    return res.status(200).json({ message: 'ok', issue })
  } catch (error) {
    return res.status(400).json({ message: 'Invalid code' })
  }
}
