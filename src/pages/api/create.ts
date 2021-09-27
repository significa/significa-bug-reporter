import { LinearClient } from '@linear/sdk'
import { NextApiRequest, NextApiResponse } from 'next'

const linearClient = new LinearClient({
  accessToken: process.env.LINEAR_OAUTH_ACCESS_TOKEN,
})

const isImage = (url: string) => {
  return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(url)
}

const isVideo = (url: string) => {
  return /\.(mov|avi|wmv|flv|3gp|mp4|mpg)$/i.test(url)
}

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

    const teamId = Buffer.from(team, 'base64').toString('utf-8')

    const priorityLabel: Record<string, string> = {
      low: '🟢 **Low**',
      medium: '🟡 **Medium**',
      high: '🟠 **High**',
      critical: '🔴 **Critical**',
    }

    const getAttachments = (): string => {
      if (attachments.length === 0) return ''

      return (
        '## Attachments\n' +
        '___ \n' +
        attachments
          .sort((a) => {
            if (isImage(a)) return 2

            if (isVideo(a)) return 1

            return -1
          })
          .map((attach) => {
            if (isImage(attach)) {
              return `![${attach}](${encodeURI(attach)})  \n`
            }

            if (isVideo(attach)) {
              return `- 🍿 Video: [${attach}](${encodeURI(attach)})  \n`
            }

            return `- 📎 File: [${attach}](${encodeURI(attach)})  \n`
          })
          .join('') +
        '&nbsp;  \n' +
        '&nbsp;  \n' +
        '&nbsp;  \n'
      )
    }

    const payload =
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
      getAttachments() +
      `${priorityLabel[priority]} priority bug reported by ${author}`

    const { success, issue } = await linearClient.issueCreate({
      teamId,
      title,
      description: payload,
    })

    if (!success) {
      throw new Error("Couldn't create issue")
    }

    return res.status(200).json({ message: 'ok', issue })
  } catch (error) {
    return res.status(400).json({ message: 'Invalid code' })
  }
}
